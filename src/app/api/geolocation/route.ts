import { NextRequest, NextResponse } from 'next/server'

async function fetchFromIPINFO(ip: string | null) {
  try {
    console.log('[GEOLOCATION_API] Trying ipinfo.io with IP:', ip)
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    // Si se proporciona IP, usarla; si no, ipinfo.io usa la IP del servidor
    const url = ip ? `https://ipinfo.io/${ip}/json` : 'https://ipinfo.io/json'
    
    const response = await fetch(url, {
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn('[GEOLOCATION_API] ipinfo.io returned status:', response.status)
      return null
    }

    const data = await response.json()
    console.log('[GEOLOCATION_API] ipinfo.io response:', { country: data.country, city: data.city, ip: data.ip })
    
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

    // Obtener IP del cliente desde parámetro de query
    const clientIP = request.nextUrl.searchParams.get('ip')
    console.log('[GEOLOCATION_API] Received client IP:', clientIP)

    // Usar ipinfo.io (100k req/mes gratis, sin API key requerida)
    const data = await fetchFromIPINFO(clientIP)

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
