'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

/**
 * IDX Broker Widget using iframe
 * Note: Due to CORS restrictions, cannot inject scripts into cross-origin iframe
 * Solution: User clicks property → opens in new window → we capture via referrer/URL
 */
export default function IDXBrokerWidgetIframe() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const router = useRouter()

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    console.log('[PROPERTY_CAPTURE] Widget mounted')
    console.log('[PROPERTY_CAPTURE] Note: IDX Broker is cross-origin, script injection blocked by CORS')
    console.log('[PROPERTY_CAPTURE] Solution: Monitoring for property navigation via referrer')

    // Monitor for when user navigates to a property detail page
    // This works by checking the document.referrer
    const checkReferrer = () => {
      const referrer = document.referrer
      if (referrer && referrer.includes('ivanutahrealtor.idxbroker.com')) {
        console.log('[PROPERTY_CAPTURE] User came from IDX Broker:', referrer)
        
        // Extract property ID from referrer
        const match = referrer.match(/\/details\/(\d+)/)
        if (match) {
          const propertyId = match[1]
          console.log('[PROPERTY_CAPTURE] ✓ Property detected from referrer:', propertyId)
          capturePropertyData(propertyId, referrer)
        }
      }
    }

    // Check on mount
    checkReferrer()

    // Also set up a listener for when user returns from IDX Broker
    const handleFocus = () => {
      console.log('[PROPERTY_CAPTURE] Window focused, checking for property navigation')
      checkReferrer()
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [router])

  const capturePropertyData = async (propertyId: string, propertyUrl: string) => {
    try {
      console.log('[PROPERTY_CAPTURE] Capturing property:', propertyId)
      
      const response = await fetch('/api/capture-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId,
          propertyUrl,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to capture property: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('[PROPERTY_CAPTURE] Success:', data)

      // Redirect to contact form with property data
      const queryParams = new URLSearchParams({
        property_id: propertyId,
        property_address: data.address || '',
        property_price: data.price || '',
      })

      router.push(`/contact-us?${queryParams.toString()}`)
    } catch (error) {
      console.error('[PROPERTY_CAPTURE] Error:', error)
      // Continue without capturing - user can still contact
    }
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      {/* IDX Broker Widget via iframe - full screen */}
      {/* Note: Adding target="_blank" to force new window opens for property details */}
      <iframe
        ref={iframeRef}
        src="https://ivanutahrealtor.idxbroker.com/idx/results/listings?pctPreview=649"
        title="IDX Broker Property Listings"
        className="w-full h-full border-0"
        style={{ margin: 0, padding: 0 }}
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
      />
    </div>
  )
}
