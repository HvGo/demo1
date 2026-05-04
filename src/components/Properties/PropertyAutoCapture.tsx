'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * Auto-capture property from URL query parameters
 * Works by monitoring when user returns from IDX Broker with property URL
 */
export default function PropertyAutoCapture() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isCapturing, setIsCapturing] = useState(false)

  useEffect(() => {
    // Check if there's a property URL in query params (from referrer or manual redirect)
    const propertyUrl = searchParams.get('property_url')
    const propertyId = searchParams.get('property_id')

    if (propertyUrl || propertyId) {
      console.log('[AUTO_CAPTURE] Found property in URL params:', { propertyUrl, propertyId })
      captureAndRedirect(propertyId || '', propertyUrl || '')
    }

    // Monitor for property URL in window.location.href
    // This captures when user navigates back from IDX Broker
    const checkForPropertyUrl = () => {
      const href = window.location.href
      const match = href.match(/\/idx\/details\/(\d+)/)
      
      if (match) {
        const id = match[1]
        console.log('[AUTO_CAPTURE] Detected property URL in location:', id)
        captureAndRedirect(id, href)
      }
    }

    // Check on mount
    checkForPropertyUrl()

    // Also listen for popstate (back button)
    window.addEventListener('popstate', checkForPropertyUrl)

    return () => {
      window.removeEventListener('popstate', checkForPropertyUrl)
    }
  }, [searchParams, router])

  const captureAndRedirect = async (propertyId: string, propertyUrl: string) => {
    if (!propertyId || isCapturing) return

    setIsCapturing(true)

    try {
      console.log('[AUTO_CAPTURE] Capturing property:', propertyId)

      const response = await fetch('/api/capture-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId,
          propertyUrl: propertyUrl || `https://ivanutahrealtor.idxbroker.com/idx/details/${propertyId}`,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to capture: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('[AUTO_CAPTURE] Success:', data)

      // Redirect to contact form
      const queryParams = new URLSearchParams({
        property_id: propertyId,
        property_address: data.address || '',
        property_price: data.price || '',
        property_beds: data.beds?.toString() || '',
        property_baths: data.baths?.toString() || '',
      })

      router.push(`/contact-us?${queryParams.toString()}`)
    } catch (error) {
      console.error('[AUTO_CAPTURE] Error:', error)
      setIsCapturing(false)
    }
  }

  return null // No UI needed
}
