import { NextRequest, NextResponse } from 'next/server'
// import { fetchIdxCities } from '@/lib/idxbroker' // Archived in X/idx-broker-api

/**
 * Get available cities from IDX Broker MLS
 * NOTE: This endpoint is archived - functionality moved to X/idx-broker-api
 */
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Endpoint archived',
      message: 'IDX Broker API integration has been archived. See X/idx-broker-api for details'
    },
    { status: 410 }
  )
}
