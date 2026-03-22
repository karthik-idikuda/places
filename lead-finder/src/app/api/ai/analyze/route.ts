import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    if (!GEMINI_API_KEY) {
      // Fallback: Simple keyword extraction without AI
      return NextResponse.json({
        businessType: extractBusinessType(query),
        location: extractLocation(query),
        filters: extractFilters(query),
        searchQuery: query,
        aiPowered: false
      })
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a lead generation assistant. Analyze this user search query and extract structured information for finding business leads.

User Query: "${query}"

Respond ONLY with a valid JSON object (no markdown, no explanation) in this exact format:
{
  "businessType": "the type of business they're looking for (e.g., cafe, restaurant, salon, gym, etc.)",
  "location": "the location mentioned, or null if not specified",
  "characteristics": ["list of characteristics like 'no website', 'poor branding', 'low ratings', 'needs marketing', etc."],
  "googlePlacesType": "the best matching Google Places type (e.g., cafe, restaurant, beauty_salon, gym, etc.)",
  "searchKeywords": ["array of keywords to search for"],
  "targetDescription": "brief description of ideal leads to find"
}

Examples:
- "cafes without branding" → businessType: "cafe", characteristics: ["no website", "no social media", "poor branding"]
- "restaurants in mumbai with bad reviews" → businessType: "restaurant", location: "mumbai", characteristics: ["low ratings", "poor reviews"]
- "salons that need marketing help" → businessType: "salon", characteristics: ["no website", "poor online presence", "needs marketing"]`
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 500,
          }
        })
      }
    )

    if (!response.ok) {
      console.error('Gemini API error:', await response.text())
      // Fallback to simple extraction
      return NextResponse.json({
        businessType: extractBusinessType(query),
        location: extractLocation(query),
        filters: extractFilters(query),
        searchQuery: query,
        aiPowered: false
      })
    }

    const data = await response.json()
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    
    // Parse the JSON response from Gemini
    let aiResponse
    try {
      // Remove markdown code blocks if present
      const cleanedText = aiText.replace(/```json\n?|\n?```/g, '').trim()
      aiResponse = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', aiText)
      // Fallback
      return NextResponse.json({
        businessType: extractBusinessType(query),
        location: extractLocation(query),
        filters: extractFilters(query),
        searchQuery: query,
        aiPowered: false
      })
    }

    return NextResponse.json({
      ...aiResponse,
      originalQuery: query,
      aiPowered: true
    })

  } catch (error) {
    console.error('AI Analysis error:', error)
    return NextResponse.json({ 
      error: 'Failed to analyze query',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Fallback functions for when AI is not available
function extractBusinessType(query: string): string {
  const businessTypes = [
    'restaurant', 'cafe', 'salon', 'gym', 'spa', 'hotel', 'shop', 'store',
    'clinic', 'hospital', 'school', 'college', 'office', 'agency', 'studio',
    'bakery', 'bar', 'club', 'pharmacy', 'garage', 'mechanic', 'plumber',
    'electrician', 'carpenter', 'tailor', 'laundry', 'dry cleaner'
  ]
  
  const lowerQuery = query.toLowerCase()
  for (const type of businessTypes) {
    if (lowerQuery.includes(type)) {
      return type
    }
  }
  return 'business'
}

function extractLocation(query: string): string | null {
  // Common location indicators
  const locationPatterns = [
    /in\s+([a-zA-Z\s]+?)(?:\s+with|\s+that|\s+without|$)/i,
    /near\s+([a-zA-Z\s]+?)(?:\s+with|\s+that|\s+without|$)/i,
    /at\s+([a-zA-Z\s]+?)(?:\s+with|\s+that|\s+without|$)/i,
  ]
  
  for (const pattern of locationPatterns) {
    const match = query.match(pattern)
    if (match) {
      return match[1].trim()
    }
  }
  return null
}

function extractFilters(query: string): string[] {
  const filters: string[] = []
  const lowerQuery = query.toLowerCase()
  
  if (lowerQuery.includes('without website') || lowerQuery.includes('no website')) {
    filters.push('no_website')
  }
  if (lowerQuery.includes('without branding') || lowerQuery.includes('no branding') || lowerQuery.includes('poor branding')) {
    filters.push('no_branding')
  }
  if (lowerQuery.includes('bad review') || lowerQuery.includes('low rating') || lowerQuery.includes('poor review')) {
    filters.push('low_ratings')
  }
  if (lowerQuery.includes('need marketing') || lowerQuery.includes('needs marketing')) {
    filters.push('needs_marketing')
  }
  
  return filters
}
