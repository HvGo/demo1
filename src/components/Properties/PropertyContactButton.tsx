'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Manual property contact button
 * Allows user to paste property URL and contact about it
 * 
 * Since IDX Broker uses internal navigation, user needs to:
 * 1. Click property in widget
 * 2. Copy the URL from browser address bar
 * 3. Paste it here
 */
export default function PropertyContactButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [propertyUrl, setPropertyUrl] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setPropertyUrl(text)
      setError('')
    } catch (err) {
      setError('No se pudo leer el portapapeles. Pega manualmente.')
    }
  }

  const handleContactClick = async () => {
    if (!propertyUrl.trim()) {
      setError('Por favor ingresa o pega la URL de la propiedad')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      console.log('[PROPERTY_CONTACT] Capturing property from URL:', propertyUrl)

      // Extract property ID from URL
      const propertyMatch = propertyUrl.match(/\/details\/(\d+)/)
      if (!propertyMatch) {
        setError('URL inválida. Debe contener /details/{id}. Ejemplo: https://ivanutahrealtor.idxbroker.com/idx/details/12345')
        setIsLoading(false)
        return
      }

      const propertyId = propertyMatch[1]

      // Call capture endpoint
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
      console.log('[PROPERTY_CONTACT] Success:', data)

      // Redirect to contact form with property data
      const queryParams = new URLSearchParams({
        property_id: propertyId,
        property_address: data.address || '',
        property_price: data.price || '',
      })

      router.push(`/contact-us?${queryParams.toString()}`)
    } catch (error) {
      console.error('[PROPERTY_CONTACT] Error:', error)
      setError('Error al capturar la propiedad. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showInput && (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-3 w-96 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Contactar sobre una propiedad
          </h3>
          
          <p className="text-xs text-gray-600 mb-3">
            1. Haz clic en una propiedad en el widget<br/>
            2. Copia la URL de la barra de direcciones<br/>
            3. Pégala aquí
          </p>

          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://ivanutahrealtor.idxbroker.com/idx/details/..."
                value={propertyUrl}
                onChange={(e) => {
                  setPropertyUrl(e.target.value)
                  setError('')
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handlePaste}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300"
                title="Pegar desde portapapeles"
              >
                📋
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleContactClick}
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Capturando...' : 'Contactar'}
              </button>
              <button
                onClick={() => {
                  setShowInput(false)
                  setPropertyUrl('')
                  setError('')
                }}
                className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowInput(!showInput)}
        className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
        title="Contactar sobre una propiedad"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  )
}
