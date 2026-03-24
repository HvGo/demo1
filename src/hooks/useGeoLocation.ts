'use client'

import { useState, useEffect } from 'react'

interface GeoLocationData {
  country: string | null
  city: string | null
  latitude: number | null
  longitude: number | null
  success: boolean
}

async function getClientIP(): Promise<string | null> {
  try {
    // Intentar obtener IP del cliente desde un servicio externo
    const response = await fetch('https://api.ipify.org?format=json', { 
      signal: AbortSignal.timeout(3000) 
    })
    if (!response.ok) return null
    const data = await response.json()
    return data.ip || null
  } catch {
    return null
  }
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
        
        // Obtener IP del cliente
        const clientIP = await getClientIP()
        console.log('[GEO_LOCATION] Client IP:', clientIP)
        
        // Llamar al endpoint backend con la IP del cliente
        const url = clientIP ? `/api/geolocation?ip=${encodeURIComponent(clientIP)}` : '/api/geolocation'
        const response = await fetch(url)
        
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
