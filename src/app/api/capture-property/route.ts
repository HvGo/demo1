import { NextRequest, NextResponse } from 'next/server'
import { scrapePropertyDetails } from '@/lib/property-scraper'

/**
 * Endpoint to capture property data from IDX Broker
 * Extracts property information and stores it for contact form
 */
export async function POST(request: NextRequest) {
  try {
    const { propertyId, propertyUrl } = await request.json()

    if (!propertyId) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      )
    }

    console.log('[CAPTURE_PROPERTY] Capturing property:', propertyId)
    console.log('[CAPTURE_PROPERTY] URL:', propertyUrl)

    // Scrape property details from IDX Broker
    const propertyData = await scrapePropertyDetails(propertyId, propertyUrl)

    console.log('[CAPTURE_PROPERTY] Scraped data:', JSON.stringify(propertyData, null, 2))

    // TODO: Save to database
    // await db.propertyCaptures.create({
    //   propertyId,
    //   propertyUrl,
    //   data: propertyData,
    //   capturedAt: new Date(),
    // })

    console.log('[CAPTURE_PROPERTY] Success - Returning data:', {
      address: propertyData.address,
      price: propertyData.price,
      beds: propertyData.beds,
      baths: propertyData.baths,
      sqft: propertyData.sqft,
      yearBuilt: propertyData.yearBuilt,
      lotSize: propertyData.lotSize,
      type: propertyData.type,
      status: propertyData.status,
    })

    return NextResponse.json({
      success: true,
      address: propertyData.address,
      price: propertyData.price,
      beds: propertyData.beds,
      baths: propertyData.baths,
      sqft: propertyData.sqft,
      yearBuilt: propertyData.yearBuilt,
      lotSize: propertyData.lotSize,
      type: propertyData.type,
      status: propertyData.status,
      message: 'Property captured successfully',
    })
  } catch (error) {
    console.error('[CAPTURE_PROPERTY_ERROR]', error)
    return NextResponse.json(
      {
        error: 'Failed to capture property',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
