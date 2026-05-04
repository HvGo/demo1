import { NextRequest, NextResponse } from 'next/server'
import { fetchIdxCities } from '@/lib/idxbroker'

/**
 * Get properties by city from IDX Broker
 * Since IDX Broker doesn't have a direct search endpoint,
 * we use the cities endpoint and return city information
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const city = searchParams.get('city')

    const accessKey = process.env.IDX_BROKER_ACCESS_KEY
    const mlsId = process.env.IDX_BROKER_MLS_ID

    if (!accessKey || !mlsId) {
      return NextResponse.json(
        { 
          error: 'IDX Broker credentials not configured',
          message: 'Please set IDX_BROKER_ACCESS_KEY and IDX_BROKER_MLS_ID in environment variables'
        },
        { status: 400 }
      )
    }

    console.log('[IDX_PROPERTIES_BY_CITY] Fetching cities for MLS:', mlsId)

    // Get all available cities
    const allCities = await fetchIdxCities(accessKey, mlsId)

    console.log('[IDX_PROPERTIES_BY_CITY] All cities:', {
      count: allCities.length,
      sample: allCities.length > 0 ? allCities.slice(0, 3) : [],
    })

    // If city parameter is provided, filter by that city
    let filteredCities = allCities
    if (city) {
      filteredCities = allCities.filter((c: any) => 
        c.cityName?.toLowerCase().includes(city.toLowerCase()) ||
        c.name?.toLowerCase().includes(city.toLowerCase())
      )
      console.log('[IDX_PROPERTIES_BY_CITY] Filtered cities:', {
        searchTerm: city,
        count: filteredCities.length,
      })
    }

    return NextResponse.json({
      success: true,
      data: filteredCities,
      count: filteredCities.length,
      message: city 
        ? `Found ${filteredCities.length} cities matching "${city}"`
        : `Found ${filteredCities.length} total cities`,
    })
  } catch (error) {
    console.error('[IDX_PROPERTIES_BY_CITY_ERROR]', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch properties by city from IDX Broker',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
