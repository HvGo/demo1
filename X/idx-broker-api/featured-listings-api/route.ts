import { NextRequest, NextResponse } from 'next/server'

const IDX_API_BASE = 'https://api.idxbroker.com'
const IDX_API_KEY = process.env.IDX_BROKER_API_KEY || 'szoX-bfnjCUCSNX85oFaTt'

// Cache temporal para evitar llamadas repetidas a IDX Broker
let cachedListings: any[] | null = null
let cacheTime = 0
const CACHE_DURATION = 3600000 // 1 hora en milisegundos

// Función para extraer solo los campos necesarios de una propiedad
function extractListingData(listing: any) {
  return {
    address: listing.address || '',
    price: listing.price || 0,
    listingPrice: listing.listingPrice || '',
    bedrooms: listing.bedrooms || 0,
    fullBaths: listing.fullBaths || 0,
    totalBaths: listing.totalBaths || 0,
    sqFt: listing.sqFt || '',
    remarksConcat: listing.remarksConcat || '',
    image: listing.image && listing.image[0] ? listing.image[0].url : '',
    fullDetailsURL: listing.fullDetailsURL || '',
    latitude: listing.latitude || 0,
    longitude: listing.longitude || 0,
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('=== FEATURED LISTINGS ENDPOINT CALLED ===')
    
    // Obtener parámetros de query para filtros
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit') || '50'
    const offset = searchParams.get('offset') || '0'
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const bedrooms = searchParams.get('bedrooms')

    console.log('Fetching featured listings from IDX Broker...')

    // Llamar a IDX Broker API para obtener featured listings
    // Agregar parámetro 'include' para obtener los datos completos
    const response = await fetch(`${IDX_API_BASE}/clients/featured?include=all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'AccessKey': IDX_API_KEY,
      },
    })

    console.log('IDX Broker response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('IDX Broker API error:', response.status, errorText)
      return NextResponse.json(
        { error: `Failed to fetch: ${response.status}` },
        { status: response.status }
      )
    }

    let listings: any[] = []
    
    // Usar cache si está disponible
    if (cachedListings && (Date.now() - cacheTime) < CACHE_DURATION) {
      console.log('✓ Using cached listings, count:', cachedListings.length)
      listings = cachedListings
    } else {
      try {
        const data = await response.json()
        
        console.log('Response received, parsing...')
        console.log('Data type:', typeof data)
        console.log('Data keys:', Object.keys(data).slice(0, 5))
        
        // IDX Broker devuelve solo metadatos (total, first, last, next, previous)
        // pero no los datos reales en este endpoint
        // Necesitamos hacer una llamada adicional o usar un endpoint diferente
        
        // Por ahora, retornar vacío y loguear para debugging
        console.log('✗ IDX Broker /clients/featured endpoint returns metadata only, not actual listings')
        listings = []
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError)
        listings = []
      }
    }

    // Aplicar filtros
    let filtered = listings

    if (minPrice) {
      const min = parseFloat(minPrice)
      filtered = filtered.filter(l => {
        const price = l.price || 0
        return price >= min
      })
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice)
      filtered = filtered.filter(l => {
        const price = l.price || 0
        return price <= max
      })
    }

    if (bedrooms) {
      const beds = parseInt(bedrooms)
      filtered = filtered.filter(l => {
        const propBeds = parseInt(l.bedrooms || 0)
        return propBeds >= beds
      })
    }

    // Aplicar limit y offset
    const offsetNum = parseInt(offset)
    const limitNum = parseInt(limit)
    const paginatedListings = filtered.slice(offsetNum, offsetNum + limitNum)

    return NextResponse.json({
      success: true,
      total: filtered.length,
      limit: limitNum,
      offset: offsetNum,
      listings: paginatedListings,
    })
  } catch (error) {
    console.error('Error fetching featured listings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
