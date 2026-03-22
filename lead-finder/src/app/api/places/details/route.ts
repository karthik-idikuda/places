import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAmlCO2Ph6TTGaHjs2oI-Pqk1Ejf0l20ME'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  // Support both placeId and place_id parameters
  const placeId = searchParams.get('placeId') || searchParams.get('place_id')
  
  if (!placeId) {
    return NextResponse.json({ 
      error: 'placeId parameter is required',
      message: 'Please provide a valid Google Place ID'
    }, { status: 400 })
  }
  
  try {
    const fields = 'name,formatted_address,formatted_phone_number,international_phone_number,website,rating,user_ratings_total,url,place_id,business_status,opening_hours,types,geometry'
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!response.ok) {
      throw new Error(`Google API responded with status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.status !== 'OK') {
      console.error('Google Place Details API error:', data.status, data.error_message)
      return NextResponse.json({ 
        error: data.error_message || 'Failed to fetch place details',
        status: data.status 
      }, { status: data.status === 'NOT_FOUND' ? 404 : 500 })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Place Details API error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch place details',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
