/**
 * Property Scraper for IDX Broker
 * Extracts property details from IDX Broker property detail pages
 */

interface PropertyData {
  propertyId: string
  address: string
  price: string
  beds: number
  baths: number
  sqft: number
  yearBuilt?: number
  lotSize?: string
  type?: string
  status?: string
  description?: string
}

/**
 * Scrape property details from IDX Broker
 * Uses cheerio for HTML parsing
 */
export async function scrapePropertyDetails(
  propertyId: string,
  propertyUrl: string
): Promise<PropertyData> {
  try {
    console.log('[SCRAPER] Fetching property details:', propertyId)

    // Fetch the property page
    const response = await fetch(propertyUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch property page: ${response.statusText}`)
    }

    const html = await response.text()

    // Parse HTML and extract data
    // This is a basic implementation - adjust selectors based on actual IDX Broker HTML
    const propertyData = parsePropertyHTML(html, propertyId, propertyUrl)

    console.log('[SCRAPER] Successfully scraped property:', propertyData)
    return propertyData
  } catch (error) {
    console.error('[SCRAPER_ERROR]', error)
    // Return basic data structure if scraping fails
    return {
      propertyId,
      address: 'Property Address',
      price: '$0',
      beds: 0,
      baths: 0,
      sqft: 0,
    }
  }
}

/**
 * Parse HTML and extract property information
 * Adjust selectors based on actual IDX Broker HTML structure
 */
function parsePropertyHTML(
  html: string,
  propertyId: string,
  propertyUrl: string
): PropertyData {
  console.log('[SCRAPER] Parsing HTML for property:', propertyId)
  console.log('[SCRAPER] HTML length:', html.length)

  // Extract address (common patterns)
  const addressMatch = html.match(
    /<h1[^>]*>([^<]+)<\/h1>|<div[^>]*class="[^"]*address[^"]*"[^>]*>([^<]+)<\/div>/i
  )
  const address = addressMatch ? (addressMatch[1] || addressMatch[2]).trim() : 'Property Address'
  console.log('[SCRAPER] Address match:', addressMatch ? 'found' : 'not found', '→', address)

  // Extract price (common patterns: $XXX,XXX or Price: $XXX,XXX)
  const priceMatch = html.match(/\$[\d,]+(?:\.\d{2})?/)
  const price = priceMatch ? priceMatch[0] : '$0'
  console.log('[SCRAPER] Price match:', priceMatch ? 'found' : 'not found', '→', price)

  // Extract beds (common patterns: X Bed, X BR, Beds: X)
  const bedsMatch = html.match(/(\d+)\s*(?:bed|br|bedroom)/i)
  const beds = bedsMatch ? parseInt(bedsMatch[1]) : 0
  console.log('[SCRAPER] Beds match:', bedsMatch ? 'found' : 'not found', '→', beds)

  // Extract baths (common patterns: X Bath, X BA, Baths: X)
  const bathsMatch = html.match(/(\d+)\s*(?:bath|ba|bathroom)/i)
  const baths = bathsMatch ? parseInt(bathsMatch[1]) : 0
  console.log('[SCRAPER] Baths match:', bathsMatch ? 'found' : 'not found', '→', baths)

  // Extract sqft (common patterns: X,XXX sqft, X,XXX sq ft)
  const sqftMatch = html.match(/(\d+(?:,\d+)?)\s*(?:sqft|sq\.?\s*ft)/i)
  const sqft = sqftMatch ? parseInt(sqftMatch[1].replace(/,/g, '')) : 0
  console.log('[SCRAPER] Sqft match:', sqftMatch ? 'found' : 'not found', '→', sqft)

  // Extract year built
  const yearMatch = html.match(/(?:year\s+built|built|year)[\s:]*(\d{4})/i)
  const yearBuilt = yearMatch ? parseInt(yearMatch[1]) : undefined
  console.log('[SCRAPER] Year built match:', yearMatch ? 'found' : 'not found', '→', yearBuilt)

  // Extract lot size
  const lotMatch = html.match(/(?:lot\s+size|lot)[\s:]*([^<\n]+)/i)
  const lotSize = lotMatch ? lotMatch[1].trim() : undefined
  console.log('[SCRAPER] Lot size match:', lotMatch ? 'found' : 'not found', '→', lotSize)

  // Extract property type
  const typeMatch = html.match(/(?:property\s+type|type)[\s:]*([^<\n]+)/i)
  const type = typeMatch ? typeMatch[1].trim() : undefined
  console.log('[SCRAPER] Type match:', typeMatch ? 'found' : 'not found', '→', type)

  // Extract status
  const statusMatch = html.match(/(?:status|listing\s+status)[\s:]*([^<\n]+)/i)
  const status = statusMatch ? statusMatch[1].trim() : undefined
  console.log('[SCRAPER] Status match:', statusMatch ? 'found' : 'not found', '→', status)

  const result = {
    propertyId,
    address,
    price,
    beds,
    baths,
    sqft,
    yearBuilt,
    lotSize,
    type,
    status,
  }

  console.log('[SCRAPER] Final extracted data:', result)
  return result
}
