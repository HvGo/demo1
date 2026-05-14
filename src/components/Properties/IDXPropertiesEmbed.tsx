'use client'

import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'

export default function IDXPropertiesEmbed() {
  const [iframeHeight, setIframeHeight] = useState('800px')
  const [address, setAddress] = useState('')
  const [iframeSrc, setIframeSrc] = useState('https://ivanutahrealtor.idxbroker.com/i/proper')
  const [iframeKey, setIframeKey] = useState(0)
  const [searchCount, setSearchCount] = useState(0)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const MAX_SEARCHES = 4

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Verificar si se alcanzó el límite
    if (searchCount >= MAX_SEARCHES) {
      setShowLimitModal(true)
      return
    }

    if (address.trim()) {
      // Actualizar el src del iframe con los parámetros de búsqueda
      const encodedAddress = address.trim().replace(/\s+/g, '+')
      const searchUrl = `https://ivanutahrealtor.idxbroker.com/i/proper?idxID=c072&aw_address=${encodedAddress}&ccz=city&pt=1`
      setIframeSrc(searchUrl)
      setIframeKey(prev => prev + 1)
      setSearchCount(prev => prev + 1)
    }
  }

  useEffect(() => {
    // Ajustar altura del iframe según el contenido
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
          // Cross-origin, no se puede acceder al contenido
          console.log('Cross-origin iframe - altura fija')
        }
      }
    }

    // Intentar ajustar altura después de cargar
    const timer = setTimeout(handleResize, 2000)
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="w-full">
      {/* Modal de límite de búsquedas */}
      {showLimitModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Límite de Búsquedas Alcanzado
              </h2>
              <button
                onClick={() => setShowLimitModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Has alcanzado el límite de {MAX_SEARCHES} búsquedas por sesión. Para continuar buscando más propiedades, por favor completa nuestro formulario de contacto.
            </p>

            <Link
              href="/contactus"
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-center block"
              style={{ backgroundColor: '#067ff9' }}
            >
              Ir a Contacto
            </Link>
          </div>
        </div>
      )}

      {/* Control de búsqueda por dirección - Mejorado */}
      <div className="flex justify-center px-4" style={{ padding: '0 !important', paddingBottom: '0 !important' }}>
        <div className="w-full max-w-2xl" style={{ padding: '0 !important', paddingBottom: '0 !important' }}>
          {/* Contador de búsquedas */}
          <div className="text-right text-sm text-gray-500 dark:text-gray-400 mb-2">
            Búsquedas: {searchCount}/{MAX_SEARCHES}
          </div>

          {/* Formulario de búsqueda */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3" style={{ padding: '0 !important', paddingBottom: '0 !important', margin: '0 !important' }}>
            <div className="flex-1 relative">
              <input
                id="address-search"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ingresa una dirección, ciudad o código postal"
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

          {/* Sugerencias */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Ej: &quot;123 Main Street&quot; o &quot;Salt Lake City&quot; o &quot;84101&quot;</p>
          </div>
        </div>
      </div>

      {/* Iframe de IDX Broker */}
      <style>{`
        /* Estilos para mejorar la integración del iframe */
        #idx-properties-iframe {
          width: 100%;
          height: ${iframeHeight};
          border: none;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* Responsive */
        @media (max-width: 768px) {
          #idx-properties-iframe {
            border-radius: 4px;
          }
        }

        /* CSS para ocultar elementos del iframe de IDX Broker */
        /* Nota: Estos estilos se aplican al contenedor del iframe, 
           pero pueden afectar elementos si se usan selectores CSS válidos */
        
        /* Ocultar botones en la página de detalles */
        #IDX-detailsActionNew,
        #IDX-detailsActionModify,
        #IDX-detailsActionBack {
          display: none !important;
        }

        /* Ocultar botones generales de búsqueda */
        button[class*="search"],
        button[class*="new"],
        button[class*="modify"],
        [class*="new-search"],
        [class*="modify-search"],
        .idx-search-new,
        .idx-search-modify {
          display: none !important;
        }

        /* Ocultar mensaje "SHOWING 500 LISTINGS..." */
        [class*="showing"],
        [class*="listings-info"],
        .idx-info-message,
        [class*="search-info"],
        [class*="result-info"] {
          display: none !important;
        }

        /* Ocultar contador "500 LISTINGS" */
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
        title="IDX Broker Properties"
        allowFullScreen
        loading="lazy"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
      />

    </div>
  )
}
