'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

export default function IDXPropertiesEmbed() {
  const [iframeHeight, setIframeHeight] = useState('800px')
  const [address, setAddress] = useState('')
  const [iframeSrc, setIframeSrc] = useState('https://ivanutahrealtor.idxbroker.com/i/proper1')
  const [iframeKey, setIframeKey] = useState(0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Si el campo está vacío, mostrar todos los resultados sin aw_address
    if (!address.trim()) {
      const searchUrl = `https://ivanutahrealtor.idxbroker.com/i/proper1?idxID=c072&ccz=city&pt=1`
      setIframeSrc(searchUrl)
      setIframeKey(prev => prev + 1)
    } else {
      // Si hay dirección, filtrar por aw_address
      const encodedAddress = address.trim().replace(/\s+/g, '+')
      const searchUrl = `https://ivanutahrealtor.idxbroker.com/i/proper1?idxID=c072&aw_address=${encodedAddress}&ccz=city&pt=1`
      setIframeSrc(searchUrl)
      setIframeKey(prev => prev + 1)
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
      {/* Control de búsqueda por dirección */}
      <div className="flex justify-center px-4" style={{ padding: '0 !important', paddingBottom: '0 !important' }}>
        <div className="w-full max-w-2xl" style={{ padding: '0 !important', paddingBottom: '0 !important' }}>

          {/* Formulario de búsqueda */}
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

          {/* Sugerencias */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Ej: &quot;123 Main Street</p>
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
