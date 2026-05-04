import { NextRequest, NextResponse } from 'next/server'
import { fetchIdxProperties, fetchIdxCities } from '@/lib/idxbroker'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    // Get parameters from query string
    const action = searchParams.get('action') || 'search'
    const city = searchParams.get('city')
    const status = searchParams.get('status')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const beds = searchParams.get('beds')
    const baths = searchParams.get('baths')
    const limit = searchParams.get('limit') || '5'

    // Get credentials from environment
    const accessKey = process.env.IDX_BROKER_ACCESS_KEY
    const mlsId = process.env.IDX_BROKER_MLS_ID

    if (!accessKey || !mlsId) {
      return NextResponse.json(
        { 
          error: 'IDX Broker credentials not configured',
          message: 'Please set IDX_BROKER_ACCESS_KEY and IDX_BROKER_MLS_ID in environment variables'
        },
        { status: 500 }
      )
    }

    // Handle different actions
    if (action === 'cities') {
      const cities = await fetchIdxCities(accessKey, mlsId)
      return NextResponse.json({ success: true, data: cities })
    }

    // Default: search properties
    const filters = {
      city: city || undefined,
      status: status || undefined,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      beds: beds ? parseInt(beds) : undefined,
      baths: baths ? parseInt(baths) : undefined,
      limit: parseInt(limit),
    }

    console.log('[IDX_PROPERTIES_REQUEST]', {
      accessKey: accessKey.substring(0, 5) + '***',
      mlsId,
      filters,
      timestamp: new Date().toISOString(),
    })

    const properties = await fetchIdxProperties(accessKey, mlsId, filters)

    // Filter properties to only show Utah properties
    const utahProperties = properties.filter(
      (prop) => prop.state?.toUpperCase() === 'UT' || prop.state?.toUpperCase() === 'UTAH'
    )

    console.log('[IDX_PROPERTIES_RESPONSE]', {
      totalFetched: properties.length,
      utahProperties: utahProperties.length,
      timestamp: new Date().toISOString(),
      sampleProperty: utahProperties.length > 0 ? {
        address: utahProperties[0].address,
        city: utahProperties[0].city,
        state: utahProperties[0].state,
        price: utahProperties[0].price,
      } : null,
    })

    return NextResponse.json({
      success: true,
      data: utahProperties.slice(0, 5),
      count: utahProperties.length,
      total: properties.length,
      message: `Showing ${Math.min(5, utahProperties.length)} of ${utahProperties.length} Utah properties (${properties.length} total fetched)`,
    })
  } catch (error) {
    console.error('[IDX_PROPERTIES_ERROR]', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch properties from IDX Broker',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
