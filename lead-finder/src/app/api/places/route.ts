import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAmlCO2Ph6TTGaHjs2oI-Pqk1Ejf0l20ME'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const location = searchParams.get('location')
  const type = searchParams.get('type')
  const query = searchParams.get('query')
  
  // Support both old query param and new location+type params
  const searchQuery = query || (location && type ? `${type} in ${location}` : null)
  
  if (!searchQuery) {
    return NextResponse.json({ 
      error: 'Location and type parameters are required',
      message: 'Please provide location and type, or a query parameter'
    }, { status: 400 })
  }
  
  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${API_KEY}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    })
    
    if (!response.ok) {
      throw new Error(`Google API responded with status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.status === 'ZERO_RESULTS') {
      return NextResponse.json({ 
        results: [], 
        status: 'ZERO_RESULTS',
        message: 'No places found for this search' 
      })
    }
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Google Places API error:', data.status, data.error_message)
      return NextResponse.json({ 
        error: data.error_message || 'Failed to fetch places',
        status: data.status 
      }, { status: 500 })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Places API error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch places',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
