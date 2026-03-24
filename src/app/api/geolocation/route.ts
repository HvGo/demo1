import { NextRequest, NextResponse } from 'next/server'

async function fetchFromIPINFO() {
  try {
    console.log('[GEOLOCATION_API] Trying ipinfo.io...')
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    const response = await fetch('https://ipinfo.io/json', {
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn('[GEOLOCATION_API] ipinfo.io returned status:', response.status)
      return null
    }

    const data = await response.json()
    console.log('[GEOLOCATION_API] ipinfo.io response:', { country: data.country, city: data.city })
    
    const [latitude, longitude] = data.loc ? data.loc.split(',') : [null, null]
    
    return {
      country: data.country,
      city: data.city,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
    }
  } catch (error) {
    console.error('[GEOLOCATION_API] ipinfo.io fetch error:', error instanceof Error ? error.message : error)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('[GEOLOCATION_API] Fetching geolocation...')

    // Usar ipinfo.io (100k req/mes gratis, sin API key requerida)
    const data = await fetchFromIPINFO()

    if (!data) {
      console.warn('[GEOLOCATION_API] ipinfo.io failed, returning empty response')
      return NextResponse.json(
        {
          success: true,
          country: null,
          city: null,
          latitude: null,
          longitude: null,
        },
        { status: 200 }
      )
    }

    console.log('[GEOLOCATION_API] Success:', { country: data.country, city: data.city, latitude: data.latitude, longitude: data.longitude })

    return NextResponse.json({
      success: true,
      country: data.country,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[GEOLOCATION_API] Unexpected error:', errorMessage)

    return NextResponse.json(
      {
        success: true,
        country: null,
        city: null,
        latitude: null,
        longitude: null,
      },
      { status: 200 }
    )
  }
}
