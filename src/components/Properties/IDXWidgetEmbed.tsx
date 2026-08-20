'use client'

import { useState, useEffect, useRef } from 'react'

interface IDXWidgetEmbedProps {
  widgetId: string
  cityName: string
}

export default function IDXWidgetEmbed({ widgetId, cityName }: IDXWidgetEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (scriptLoadedRef.current) return

    const container = document.getElementById('idxStart')
    if (!container) {
      console.error('IDX container not found')
      return
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'UTF-8'
    script.id = `idxwidgetsrc-${widgetId}`
    script.src = `https://ivanutahrealtor.idxbroker.com/idx/widgets/${widgetId}`
    
    script.onload = () => {
      console.log('IDX Widget script loaded successfully')
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }

    script.onerror = (error) => {
      console.error('Failed to load IDX widget script:', error)
      setIsLoading(false)
    }

    container.appendChild(script)
    scriptLoadedRef.current = true

    return () => {
      const existingScript = document.getElementById(`idxwidgetsrc-${widgetId}`)
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }, [widgetId])

  return (
    <div className="w-full relative" ref={containerRef}>
      {/* Loading Animation */}
      {isLoading && (
        <div className="flex flex-col justify-center items-center min-h-[600px] bg-gray-50 dark:bg-dark/50 rounded-lg">
          <div className="relative">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Loading {cityName} Properties...
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please wait while we fetch the latest listings
          </p>
        </div>
      )}

      {/* Widget Container */}
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: 'opacity 0.5s ease-in-out',
          minHeight: isLoading ? '0' : 'auto'
        }}
      >
        <div id="idxStart"></div>
      </div>
    </div>
  )
}
