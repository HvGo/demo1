'use client'

import { useEffect } from 'react'

/**
 * IDX Broker Widget Component
 * Embeds the IDX Broker property search widget
 * Shows live MLS listings with native search and filters
 */
export default function IDXBrokerWidget() {
  useEffect(() => {
    // Load IDX Broker widget script
    const loadScript = async () => {
      try {
        console.log('[IDX_WIDGET] Starting to load IDX Broker script...')
        
        // Create and load the script
        const script = document.createElement('script')
        script.src = 'https://ivanutahrealtor.idxbroker.com/idx/js/idx.js'
        script.async = true
        script.defer = true
        
        script.onload = () => {
          console.log('[IDX_WIDGET] Script loaded successfully')
          // Trigger widget initialization if available
          if ((window as any).idx) {
            console.log('[IDX_WIDGET] IDX object found, initializing...')
            ;(window as any).idx.init?.()
          }
        }
        
        script.onerror = () => {
          console.error('[IDX_WIDGET] Failed to load IDX Broker script')
        }
        
        document.body.appendChild(script)
        
        return () => {
          if (document.body.contains(script)) {
            document.body.removeChild(script)
          }
        }
      } catch (error) {
        console.error('[IDX_WIDGET] Error loading script:', error)
      }
    }

    loadScript()
  }, [])

  return (
    <div className="w-full">
      {/* Widget Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Propiedades Disponibles
        </h2>
        <p className="text-gray-600">
          Busca entre todas nuestras propiedades disponibles en el MLS de Utah
        </p>
      </div>

      {/* IDX Broker Widget Container */}
      <div
        id="idx-widget"
        className="w-full bg-white rounded-lg shadow-lg overflow-hidden"
        data-idx-widget="listings"
      >
        {/* Widget will be loaded here by IDX Broker script */}
        <div className="p-12 text-center text-gray-500 min-h-screen flex items-center justify-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-navy mb-4 mx-auto"></div>
            <p className="text-lg font-semibold">Cargando propiedades de IDX Broker...</p>
            <p className="text-sm mt-2">Por favor espera mientras se cargan las propiedades disponibles</p>
            <p className="text-xs mt-4 text-gray-400">Si esto tarda más de 10 segundos, usa el link abajo</p>
          </div>
        </div>
      </div>

      {/* Fallback Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm mb-4">
          ¿Tienes problemas para ver el widget?
        </p>
        <a
          href="https://ivanutahrealtor.idxbroker.com/idx/results/listings"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-primary-navy text-white rounded-lg hover:bg-opacity-90 transition font-semibold"
        >
          Ver propiedades en IDX Broker →
        </a>
      </div>
    </div>
  )
}
