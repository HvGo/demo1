'use client'

import { useState } from 'react'

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFiltersState) => void
}

export interface PropertyFiltersState {
  address: string
  propertyType: string
}

const PROPERTY_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'residential', label: 'Residential' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'luxury_villa', label: 'Luxury Villa' },
  { value: 'office_spaces', label: 'Office Spaces' },
]

export default function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<PropertyFiltersState>({
    address: '',
    propertyType: '',
  })

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, address: e.target.value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = { ...filters, propertyType: e.target.value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters = { address: '', propertyType: '' }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Address Filter */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Enter address or city..."
            value={filters.address}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        {/* Property Type Filter */}
        <div>
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            id="propertyType"
            value={filters.propertyType}
            onChange={handlePropertyTypeChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}
