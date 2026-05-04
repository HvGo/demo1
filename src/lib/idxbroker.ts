/**
 * IDX Broker API Integration
 * Documentation: https://middleware.idxbroker.com/docs/api/overview.php
 */

const IDX_API_BASE = 'https://api.idxbroker.com'

export interface IdxProperty {
  id: string
  address: string
  city: string
  state: string
  zip: string
  price: number
  beds: number
  baths: number
  sqft: number
  type: string
  status: string
  listDate?: string
  images?: string[]
  [key: string]: any
}

interface IdxApiResponse {
  success: boolean
  data?: any
  error?: string
}

/**
 * Fetch properties from IDX Broker API
 * @param accessKey - IDX Broker access key
 * @param mlsId - MLS ID to query
 * @param filters - Optional filters (city, status, price range, etc.)
 */
export async function fetchIdxProperties(
  accessKey: string,
  mlsId: string,
  filters?: {
    city?: string
    status?: string
    minPrice?: number
    maxPrice?: number
    beds?: number
    baths?: number
    limit?: number
  }
): Promise<IdxProperty[]> {
  try {
    // Use internal MLS ID if available, otherwise use provided mlsId
    const internalMlsId = process.env.IDX_BROKER_MLS_ID_INTERNAL || mlsId
    
    // Build query string with filters (accesskey goes in header)
    const queryParams = new URLSearchParams()
    
    if (filters?.city) queryParams.append('city', filters.city)
    if (filters?.status) queryParams.append('status', filters.status)
    if (filters?.minPrice) queryParams.append('minprice', filters.minPrice.toString())
    if (filters?.maxPrice) queryParams.append('maxprice', filters.maxPrice.toString())
    if (filters?.beds) queryParams.append('beds', filters.beds.toString())
    if (filters?.baths) queryParams.append('baths', filters.baths.toString())
    if (filters?.limit) queryParams.append('limit', filters.limit.toString())

    const queryString = queryParams.toString()
    const url = `${IDX_API_BASE}/mls/search/${internalMlsId}${queryString ? '?' + queryString : ''}`

    console.log('[IDX_BROKER] Fetching from URL:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accesskey': accessKey,
      },
    })

    console.log('[IDX_BROKER] Response status:', response.status)

    if (!response.ok) {
      const responseText = await response.text()
      console.error('[IDX_BROKER] Error response:', responseText)
      throw new Error(`IDX API error: ${response.status} ${response.statusText}`)
    }

    const data: IdxApiResponse = await response.json()

    console.log('[IDX_BROKER] Response data:', {
      success: data.success,
      dataLength: Array.isArray(data.data) ? data.data.length : 'not array',
    })

    if (!data.success) {
      throw new Error(`IDX API returned error: ${data.error}`)
    }

    // Transform IDX data to our format
    return transformIdxProperties(data.data || [])
  } catch (error) {
    console.error('Error fetching from IDX Broker:', error)
    throw error
  }
}

/**
 * Transform IDX Broker property data to our format
 */
function transformIdxProperties(idxData: any[]): IdxProperty[] {
  if (!Array.isArray(idxData)) {
    return []
  }

  return idxData.map((prop) => ({
    id: prop.listingID || prop.id,
    address: `${prop.address || ''} ${prop.address2 || ''}`.trim(),
    city: prop.city || '',
    state: prop.state || '',
    zip: prop.zip || '',
    price: parseFloat(prop.listPrice) || 0,
    beds: parseInt(prop.bedrooms) || 0,
    baths: parseInt(prop.bathrooms) || 0,
    sqft: parseInt(prop.sqft) || 0,
    type: prop.propertyType || 'Residential',
    status: prop.status || 'Active',
    listDate: prop.listDate,
    images: prop.images || [],
    ...prop, // Include all original fields
  }))
}

/**
 * Get available cities from IDX Broker MLS
 */
export async function fetchIdxCities(
  accessKey: string,
  mlsId: string
): Promise<any[]> {
  try {
    // Use internal MLS ID if available, otherwise use provided mlsId
    const internalMlsId = process.env.IDX_BROKER_MLS_ID_INTERNAL || mlsId
    
    const url = `${IDX_API_BASE}/mls/cities/${internalMlsId}`

    console.log('[IDX_BROKER] Fetching cities from URL:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accesskey': accessKey,
      },
    })

    console.log('[IDX_BROKER] Cities response status:', response.status)

    if (!response.ok) {
      const responseText = await response.text()
      console.error('[IDX_BROKER] Cities error response:', responseText)
      throw new Error(`IDX API error: ${response.status}`)
    }

    const data: IdxApiResponse = await response.json()

    console.log('[IDX_BROKER] Cities data:', data)

    if (!data.success) {
      throw new Error(`IDX API returned error: ${data.error}`)
    }

    return data.data || []
  } catch (error) {
    console.error('Error fetching cities from IDX Broker:', error)
    return []
  }
}

/**
 * Get property details from IDX Broker
 */
export async function fetchIdxPropertyDetail(
  accessKey: string,
  mlsId: string,
  listingId: string
): Promise<IdxProperty | null> {
  try {
    const url = `${IDX_API_BASE}/mls/detail/${mlsId}/${listingId}?accesskey=${accessKey}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`IDX API error: ${response.status}`)
    }

    const data: IdxApiResponse = await response.json()

    if (!data.success || !data.data) {
      return null
    }

    const [property] = transformIdxProperties([data.data])
    return property || null
  } catch (error) {
    console.error('Error fetching property detail from IDX Broker:', error)
    return null
  }
}
