'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'

interface FeaturedListing {
  address: string
  listingPrice: string
  bedrooms: string
  totalBaths: string
  remarksConcat: string
  latitude: string
  longitude: string
  image: string
  fullDetailsURL: string
}

export default function FeaturedListingsClient() {
  const [listings, setListings] = useState<FeaturedListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  })

  // Cargar propiedades al montar el componente
  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async (filterParams?: typeof filters) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      params.append('limit', '50')

      const filtersToUse = filterParams || filters
      if (filtersToUse.minPrice) params.append('minPrice', filtersToUse.minPrice)
      if (filtersToUse.maxPrice) params.append('maxPrice', filtersToUse.maxPrice)
      if (filtersToUse.bedrooms) params.append('bedrooms', filtersToUse.bedrooms)

      const response = await fetch(`/api/featured-listings?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setListings(data.listings)
        setError(null)
      } else {
        setError(data.error || 'Failed to fetch listings')
      }
    } catch (err) {
      setError('Error fetching listings')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleApplyFilters = () => {
    fetchListings(filters)
  }

  const handleResetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
    })
    fetchListings({
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
    })
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dark dark:text-white">Featured Listings</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Total properties: <span className="font-semibold">{listings.length}</span>
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 dark:bg-dark/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">
              Min Price
            </label>
            <input
              type="number"
              name="minPrice"
              placeholder="$0"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-dark dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">
              Max Price
            </label>
            <input
              type="number"
              name="maxPrice"
              placeholder="$999,999"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-dark dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">
              Min Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              placeholder="0"
              value={filters.bedrooms}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-dark dark:text-white"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleApplyFilters}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            <Icon icon="ph:funnel-bold" className="text-lg" />
            Apply Filters
          </button>
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-2 bg-gray-300 dark:bg-gray-600 text-dark dark:text-white px-6 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            <Icon icon="ph:x-bold" className="text-lg" />
            Reset
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Listings Grid */}
      {loading ? (
        <div className="text-center py-12">
          <Icon icon="eos-icons:loading" className="text-4xl text-primary mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading listings...</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-dark/50 rounded-lg">
          <Icon icon="ph:house-light" className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No listings found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-dark/50 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              {listing.image ? (
                <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={listing.image}
                    alt={listing.address}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Icon icon="ph:image-light" className="text-4xl text-gray-400" />
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                {/* Price */}
                <p className="text-2xl font-bold text-primary mb-2">
                  ${parseFloat(listing.listingPrice || '0').toLocaleString()}
                </p>

                {/* Address */}
                <h3 className="text-lg font-semibold text-dark dark:text-white mb-2 line-clamp-2">
                  {listing.address}
                </h3>

                {/* Features */}
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  {listing.bedrooms && (
                    <div className="flex items-center gap-1">
                      <Icon icon="ph:bed-light" className="text-lg" />
                      <span>{listing.bedrooms} Beds</span>
                    </div>
                  )}
                  {listing.totalBaths && (
                    <div className="flex items-center gap-1">
                      <Icon icon="ph:bathtub-light" className="text-lg" />
                      <span>{listing.totalBaths} Baths</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {listing.remarksConcat && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {listing.remarksConcat}
                  </p>
                )}

                {/* Details Button */}
                {listing.fullDetailsURL && (
                  <a
                    href={listing.fullDetailsURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition text-sm"
                  >
                    View Details
                    <Icon icon="ph:arrow-right-bold" className="text-lg" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
