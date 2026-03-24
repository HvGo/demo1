'use client'

import { useState, useEffect } from 'react'

interface GeoLocationData {
  country: string | null
  city: string | null
  latitude: number | null
  longitude: number | null
  success: boolean
}

export function useGeoLocation() {
  const [location, setLocation] = useState<GeoLocationData>({
    country: null,
    city: null,
    latitude: null,
    longitude: null,
    success: false,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGeoLocation = async () => {
      try {
        console.log('[GEO_LOCATION] Fetching geolocation from backend...')
        
        // Llamar al endpoint backend que a su vez llama a Point Pin API
        const response = await fetch('/api/geolocation')
        
        console.log('[GEO_LOCATION] Backend response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`Backend geolocation error: ${response.status}`)
        }

        const data = await response.json()
        console.log('[GEO_LOCATION] Backend response:', data)

        if (data.success) {
          setLocation({
            country: data.country || null,
            city: data.city || null,
            latitude: data.latitude || null,
            longitude: data.longitude || null,
            success: true,
          })
          
          console.log('[GEO_LOCATION] Success:', { 
            country: data.country, 
            city: data.city,
            latitude: data.latitude,
            longitude: data.longitude
          })
        } else {
          console.warn('[GEO_LOCATION] Backend returned success=false:', data.error)
          setError(data.error || 'Failed to get geolocation')
          setLocation({
            country: null,
            city: null,
            latitude: null,
            longitude: null,
            success: false,
          })
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error('[GEO_LOCATION] Error:', errorMessage)
        setError(errorMessage)
        setLocation({
          country: null,
          city: null,
          latitude: null,
          longitude: null,
          success: false,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchGeoLocation()
  }, [])

  return { location, loading, error }
}
