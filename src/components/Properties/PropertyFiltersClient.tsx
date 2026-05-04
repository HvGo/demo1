'use client'

import { useState, useMemo } from 'react'
import PropertyFilters, { PropertyFiltersState } from './PropertyFilters'
import PropertyCard from '@/components/Home/Properties/Card/Card'

interface DbPropertyHome {
  id?: string
  slug?: string
  name?: string
  title?: string
  location?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  price?: number
  currency?: string
  bedrooms?: number
  beds?: number
  bathrooms?: number
  baths?: number
  area?: number
  area_m2?: number
  sqft?: number
  type?: string
  status?: string
  images?: string[]
  rate?: number
  [key: string]: any
}

interface PropertyFiltersClientProps {
  properties?: DbPropertyHome[]
}

export default function PropertyFiltersClient({ properties: initialProperties = [] }: PropertyFiltersClientProps) {
  const [filters, setFilters] = useState<PropertyFiltersState>({
    address: '',
    propertyType: '',
  })

  // Normalize properties from database
  const normalizedProperties: DbPropertyHome[] = useMemo(() => {
    return (initialProperties || []).map(prop => ({
      ...prop,
      address: prop.address || prop.location || prop.name || '',
      city: prop.city || '',
      state: prop.state || 'UT',
      zip: prop.zip || '',
      price: prop.price || 0,
      beds: prop.beds || prop.bedrooms || 0,
      baths: prop.baths || prop.bathrooms || 0,
      sqft: prop.sqft || prop.area || 0,
      type: prop.type || 'Residential',
      status: prop.status || 'Active',
      images: prop.images || [],
    }))
  }, [initialProperties])

  // Filter properties based on address search
  const filteredProperties = useMemo(() => {
    if (!filters.address && !filters.propertyType) {
      return normalizedProperties
    }

    return normalizedProperties.filter((property) => {
      const addressMatch = !filters.address || 
        `${property.address} ${property.city} ${property.state}`.toLowerCase().includes(filters.address.toLowerCase())
      
      const typeMatch = !filters.propertyType || 
        property.type?.toLowerCase() === filters.propertyType.toLowerCase()
      
      return addressMatch && typeMatch
    })
  }, [normalizedProperties, filters])

  const handleFilterChange = (newFilters: PropertyFiltersState) => {
    setFilters(newFilters)
  }

  return (
    <>
      {/* Filters */}
      <PropertyFilters onFilterChange={handleFilterChange} />

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredProperties.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{normalizedProperties.length}</span> properties
        </p>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {filteredProperties.map((property) => (
            <div key={property.slug || property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              {/* Property Image */}
              {property.images && property.images.length > 0 ? (
                <img
                  src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].src}
                  alt={property.address}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image'
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}

              {/* Property Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {property.address}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3">
                  {property.city}, {property.state} {property.zip}
                </p>

                {/* Price */}
                <p className="text-2xl font-bold text-primary-navy mb-3">
                  ${property.price.toLocaleString()}
                </p>

                {/* Property Features */}
                <div className="flex gap-4 text-sm text-gray-600 mb-3 border-t pt-3">
                  {property.beds > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{property.beds}</span>
                      <span>Beds</span>
                    </div>
                  )}
                  {property.baths > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{property.baths}</span>
                      <span>Baths</span>
                    </div>
                  )}
                  {property.sqft > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{property.sqft.toLocaleString()}</span>
                      <span>Sqft</span>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    property.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {property.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {property.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <p className="text-gray-500 text-lg">No properties found matching your filters.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria.</p>
          </div>
        </div>
      )}
    </>
  )
}
