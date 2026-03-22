import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

// Popular Indian cities for faster local suggestions
const INDIAN_CITIES = [
  { name: 'Mumbai, Maharashtra, India', shortName: 'Mumbai' },
  { name: 'Delhi, India', shortName: 'Delhi' },
  { name: 'Bangalore, Karnataka, India', shortName: 'Bangalore' },
  { name: 'Hyderabad, Telangana, India', shortName: 'Hyderabad' },
  { name: 'Chennai, Tamil Nadu, India', shortName: 'Chennai' },
  { name: 'Kolkata, West Bengal, India', shortName: 'Kolkata' },
  { name: 'Pune, Maharashtra, India', shortName: 'Pune' },
  { name: 'Ahmedabad, Gujarat, India', shortName: 'Ahmedabad' },
  { name: 'Jaipur, Rajasthan, India', shortName: 'Jaipur' },
  { name: 'Lucknow, Uttar Pradesh, India', shortName: 'Lucknow' },
  { name: 'Chandigarh, India', shortName: 'Chandigarh' },
  { name: 'Kochi, Kerala, India', shortName: 'Kochi' },
  { name: 'Indore, Madhya Pradesh, India', shortName: 'Indore' },
  { name: 'Bhopal, Madhya Pradesh, India', shortName: 'Bhopal' },
  { name: 'Surat, Gujarat, India', shortName: 'Surat' },
  { name: 'Nagpur, Maharashtra, India', shortName: 'Nagpur' },
  { name: 'Visakhapatnam, Andhra Pradesh, India', shortName: 'Visakhapatnam' },
  { name: 'Patna, Bihar, India', shortName: 'Patna' },
  { name: 'Vadodara, Gujarat, India', shortName: 'Vadodara' },
  { name: 'Goa, India', shortName: 'Goa' },
  { name: 'Coimbatore, Tamil Nadu, India', shortName: 'Coimbatore' },
  { name: 'Thiruvananthapuram, Kerala, India', shortName: 'Thiruvananthapuram' },
  { name: 'Mysore, Karnataka, India', shortName: 'Mysore' },
  { name: 'Rajkot, Gujarat, India', shortName: 'Rajkot' },
  { name: 'Jodhpur, Rajasthan, India', shortName: 'Jodhpur' },
  { name: 'Ranchi, Jharkhand, India', shortName: 'Ranchi' },
  { name: 'Guwahati, Assam, India', shortName: 'Guwahati' },
  { name: 'Bhubaneswar, Odisha, India', shortName: 'Bhubaneswar' },
  { name: 'Dehradun, Uttarakhand, India', shortName: 'Dehradun' },
  { name: 'Raipur, Chhattisgarh, India', shortName: 'Raipur' },
  { name: 'Vijayawada, Andhra Pradesh, India', shortName: 'Vijayawada' },
  { name: 'Madurai, Tamil Nadu, India', shortName: 'Madurai' },
  { name: 'Varanasi, Uttar Pradesh, India', shortName: 'Varanasi' },
  { name: 'Agra, Uttar Pradesh, India', shortName: 'Agra' },
  { name: 'Nashik, Maharashtra, India', shortName: 'Nashik' },
  { name: 'Faridabad, Haryana, India', shortName: 'Faridabad' },
  { name: 'Meerut, Uttar Pradesh, India', shortName: 'Meerut' },
  { name: 'Jabalpur, Madhya Pradesh, India', shortName: 'Jabalpur' },
  { name: 'Amritsar, Punjab, India', shortName: 'Amritsar' },
  { name: 'Allahabad, Uttar Pradesh, India', shortName: 'Allahabad' },
  { name: 'Noida, Uttar Pradesh, India', shortName: 'Noida' },
  { name: 'Gurgaon, Haryana, India', shortName: 'Gurgaon' },
  { name: 'Thane, Maharashtra, India', shortName: 'Thane' },
  { name: 'Navi Mumbai, Maharashtra, India', shortName: 'Navi Mumbai' },
];

// International cities
const INTERNATIONAL_CITIES = [
  { name: 'New York, NY, USA', shortName: 'New York' },
  { name: 'Los Angeles, CA, USA', shortName: 'Los Angeles' },
  { name: 'Chicago, IL, USA', shortName: 'Chicago' },
  { name: 'Houston, TX, USA', shortName: 'Houston' },
  { name: 'London, United Kingdom', shortName: 'London' },
  { name: 'Dubai, United Arab Emirates', shortName: 'Dubai' },
  { name: 'Singapore', shortName: 'Singapore' },
  { name: 'Sydney, Australia', shortName: 'Sydney' },
  { name: 'Toronto, Canada', shortName: 'Toronto' },
  { name: 'San Francisco, CA, USA', shortName: 'San Francisco' },
];

const ALL_CITIES = [...INDIAN_CITIES, ...INTERNATIONAL_CITIES];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const input = searchParams.get('input')?.toLowerCase() || ''
  
  if (!input || input.length < 2) {
    return NextResponse.json({ predictions: [] })
  }

  try {
    // First, check local suggestions for faster response
    const localMatches = ALL_CITIES.filter(city => 
      city.name.toLowerCase().includes(input) || 
      city.shortName.toLowerCase().includes(input) ||
      city.shortName.toLowerCase().startsWith(input)
    ).slice(0, 5).map(city => ({
      description: city.name,
      place_id: `local_${city.shortName.toLowerCase().replace(/\s/g, '_')}`,
      structured_formatting: {
        main_text: city.shortName,
        secondary_text: city.name.replace(`${city.shortName}, `, ''),
      },
      types: ['locality', 'political', 'geocode'],
    }));

    // If we have good local matches, return them immediately
    if (localMatches.length >= 3) {
      return NextResponse.json({ 
        predictions: localMatches,
        source: 'local'
      })
    }

    // Otherwise, use Google Places Autocomplete API
    if (GOOGLE_API_KEY) {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=(cities)&key=${GOOGLE_API_KEY}`
      
      const response = await fetch(url)
      const data = await response.json()

      if (data.status === 'OK' && data.predictions) {
        // Combine local and Google results, prioritizing local
        const googlePredictions = data.predictions.slice(0, 5 - localMatches.length)
        const combined = [...localMatches, ...googlePredictions]
        
        // Remove duplicates based on main text
        const seen = new Set()
        const unique = combined.filter(p => {
          const key = p.structured_formatting?.main_text?.toLowerCase() || p.description.toLowerCase()
          if (seen.has(key)) return false
          seen.add(key)
          return true
        })

        return NextResponse.json({ 
          predictions: unique.slice(0, 5),
          source: 'combined'
        })
      }
    }

    // Fallback to local only
    return NextResponse.json({ 
      predictions: localMatches,
      source: 'local'
    })

  } catch (error) {
    console.error('Autocomplete error:', error)
    
    // Return local matches on error
    const fallbackMatches = ALL_CITIES.filter(city => 
      city.name.toLowerCase().includes(input) || 
      city.shortName.toLowerCase().startsWith(input)
    ).slice(0, 5).map(city => ({
      description: city.name,
      place_id: `local_${city.shortName.toLowerCase().replace(/\s/g, '_')}`,
      structured_formatting: {
        main_text: city.shortName,
        secondary_text: city.name.replace(`${city.shortName}, `, ''),
      },
      types: ['locality'],
    }));

    return NextResponse.json({ 
      predictions: fallbackMatches,
      source: 'fallback'
    })
  }
}
