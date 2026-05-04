import { NextRequest, NextResponse } from 'next/server'
import { fetchIdxCities } from '@/lib/idxbroker'

/**
 * Get available cities from IDX Broker MLS
 */
export async function GET(request: NextRequest) {
  try {
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

    console.log('[IDX_CITIES] Fetching cities for MLS:', mlsId)

    const cities = await fetchIdxCities(accessKey, mlsId)

    console.log('[IDX_CITIES] Response:', {
      count: cities.length,
      sample: cities.length > 0 ? cities.slice(0, 3) : [],
    })

    return NextResponse.json({
      success: true,
      data: cities,
      count: cities.length,
    })
  } catch (error) {
    console.error('[IDX_CITIES_ERROR]', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch cities from IDX Broker',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
