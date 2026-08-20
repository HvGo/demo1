'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

interface IDXWidgetEmbedProps {
  widgetId: string
  cityName: string
}

export default function IDXWidgetEmbed({ widgetId, cityName }: IDXWidgetEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="w-full relative">
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

      {/* IDX Script */}
      <Script
        id={`idxwidgetsrc-${widgetId}`}
        src={`https://ivanutahrealtor.idxbroker.com/idx/widgets/${widgetId}`}
        strategy="afterInteractive"
        charSet="UTF-8"
        onLoad={() => {
          setTimeout(() => setIsLoading(false), 1000)
        }}
        onError={(e) => {
          setIsLoading(false)
          console.error('Failed to load IDX widget:', e)
        }}
      />
    </div>
  )
}
