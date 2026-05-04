'use client'

import { useEffect } from 'react'

/**
 * IDX Broker Widget using script
 * Embeds IDX Broker listings using the widget script
 */
export default function IDXBrokerWidgetScript() {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('idxwidgetsrc-153868')) {
      console.log('[IDX_WIDGET] Script already loaded')
      return
    }

    // Load the IDX Broker widget script
    const script = document.createElement('script')
    script.charset = 'UTF-8'
    script.type = 'text/javascript'
    script.id = 'idxwidgetsrc-153868'
    script.src = '//ivanutahrealtor.idxbroker.com/idx/widgets/153868'
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
      console.error('[IDX_WIDGET] Failed to load widget script')
    }

    // Append to head instead of body for better compatibility
    document.head.appendChild(script)

    return () => {
      // Cleanup: remove script on unmount
      const existingScript = document.getElementById('idxwidgetsrc-153868')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return (
    <div className="w-full min-h-screen bg-white">
      {/* IDX Broker Widget via script - will be injected here */}
      <div id="idx-widget-container" className="w-full"></div>
    </div>
  )
}
