'use client'

import { useState, useEffect } from 'react'
import PropertyContactModal, { ContactData } from './PropertyContactModal'

/**
 * Property Contact Flow
 * Handles detection of property selection and shows contact modal
 * 
 * Flow:
 * 1. User clicks property in widget
 * 2. Modal appears with property info
 * 3. User fills contact form
 * 4. Data saved to BD
 * 5. Success message shown
 */
export default function PropertyContactFlow() {
  const [showModal, setShowModal] = useState(false)
  const [propertyId, setPropertyId] = useState('')
  const [propertyAddress, setPropertyAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Listen for property selection via URL params or postMessage
  useEffect(() => {
    // Check URL params (for manual testing)
    const params = new URLSearchParams(window.location.search)
    const urlPropertyId = params.get('property_id')
    const urlPropertyAddress = params.get('property_address')

    if (urlPropertyId) {
      console.log('[PROPERTY_FLOW] Property detected from URL:', urlPropertyId)
      setPropertyId(urlPropertyId)
      setPropertyAddress(urlPropertyAddress || 'Propiedad')
      setShowModal(true)
    }

    // Listen for postMessage from iframe (if script injection works)
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'PROPERTY_SELECTED') {
        console.log('[PROPERTY_FLOW] Property detected from postMessage:', event.data.propertyId)
        setPropertyId(event.data.propertyId)
        setPropertyAddress(event.data.propertyAddress || 'Propiedad')
        setShowModal(true)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleSubmit = async (data: ContactData) => {
    setIsSubmitting(true)

    try {
      console.log('[PROPERTY_FLOW] Submitting contact:', data)

      const response = await fetch('/api/property-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Failed to save contact: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('[PROPERTY_FLOW] ✓ Contact saved:', result)

      // Show success message
      setSuccessMessage(result.message)
      setShowModal(false)

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (error) {
      console.error('[PROPERTY_FLOW] Error:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Contact Modal */}
      {showModal && (
        <PropertyContactModal
          propertyId={propertyId}
          propertyAddress={propertyAddress}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-40 max-w-md">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-green-800">¡Éxito!</h3>
              <p className="text-sm text-green-700 mt-1">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
