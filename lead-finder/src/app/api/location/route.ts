import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    return NextResponse.json({
      city: data.city,
      region: data.region,
      country: data.country_name,
      countryCode: data.country_code,
      lat: data.latitude,
      lng: data.longitude,
      timezone: data.timezone,
      location: `${data.city}, ${data.region}, ${data.country_name}`
    })
  } catch (error) {
    console.error('IP Geolocation error:', error)
    return NextResponse.json({ error: 'Failed to get location' }, { status: 500 })
  }
}
