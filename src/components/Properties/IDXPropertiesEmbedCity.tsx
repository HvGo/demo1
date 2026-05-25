'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

interface IDXPropertiesEmbedCityProps {
  cityUrl: string
  cityName: string
}

export default function IDXPropertiesEmbedCity({ cityUrl, cityName }: IDXPropertiesEmbedCityProps) {
  const [iframeHeight, setIframeHeight] = useState('800px')
  const [address, setAddress] = useState('')
  const [iframeSrc, setIframeSrc] = useState(cityUrl)
  const [iframeKey, setIframeKey] = useState(0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!address.trim()) {
      setIframeSrc(cityUrl)
      setIframeKey(prev => prev + 1)
    } else {
      const encodedAddress = address.trim().replace(/\s+/g, '+')
      const searchUrl = `${cityUrl}?aw_address=${encodedAddress}`
      setIframeSrc(searchUrl)
      setIframeKey(prev => prev + 1)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const iframe = document.getElementById('idx-properties-iframe') as HTMLIFrameElement
      if (iframe) {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
          if (iframeDoc) {
            const height = iframeDoc.documentElement.scrollHeight
            setIframeHeight(`${height + 50}px`)
          }
        } catch (e) {
          console.log('Cross-origin iframe - altura fija')
        }
      }
    }

    const timer = setTimeout(handleResize, 2000)
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="w-full">
      <div className="flex justify-center px-4" style={{ padding: '0 !important', paddingBottom: '0 !important' }}>
        <div className="w-full max-w-2xl" style={{ padding: '0 !important', paddingBottom: '0 !important' }}>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3" style={{ padding: '0 !important', paddingBottom: '0 !important', margin: '0 !important' }}>
            <div className="flex-1 relative">
              <input
                id="address-search"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ingresa una dirección"
                className="w-full px-5 py-3 border-2 rounded-lg focus:outline-none transition-all text-base"
                style={{
                  borderColor: '#067ff9',
                  color: '#067ff9',
                }}
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 font-semibold rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95"
              style={{
                backgroundColor: '#FDCB6E',
                color: '#067ff9',
              }}
            >
              <Search size={20} />
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Ej: &quot;123 Main Street</p>
          </div>
        </div>
      </div>

      <style>{`
        #idx-properties-iframe {
          width: 100%;
          height: ${iframeHeight};
          border: none;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          #idx-properties-iframe {
            border-radius: 4px;
          }
        }

        #IDX-detailsActionNew,
        #IDX-detailsActionModify,
        #IDX-detailsActionBack {
          display: none !important;
        }

        button[class*="search"],
        button[class*="new"],
        button[class*="modify"],
        [class*="new-search"],
        [class*="modify-search"],
        .idx-search-new,
        .idx-search-modify {
          display: none !important;
        }

        [class*="showing"],
        [class*="listings-info"],
        .idx-info-message,
        [class*="search-info"],
        [class*="result-info"] {
          display: none !important;
        }

        [class*="listings-count"],
        .idx-listings-count,
        [class*="result-count"] {
          display: none !important;
        }
      `}</style>

      <iframe
        key={iframeKey}
        id="idx-properties-iframe"
        src={iframeSrc}
        title={`IDX Broker Properties - ${cityName}`}
        allowFullScreen
        loading="lazy"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
      />

    </div>
  )
}
