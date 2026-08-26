'use client'

import { useEffect, useState, useRef } from 'react'

export default function IDXPropertiesEmbed() {
  const [iframeHeight, setIframeHeight] = useState('800px')
  const [iframeSrc] = useState('https://ivanutahrealtor.idxbroker.com/i/act')
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    // Inyectar script de IDX Addons dentro del contenedor .harvest
    if (!scriptLoadedRef.current) {
      const harvestDiv = document.querySelector('.harvest')
      
      if (harvestDiv) {
        const script = document.createElement('script')
        script.id = 'idxaddons-autocomplete-script'
        script.src = 'https://idxaddons.com/addon/searchtool/Q1NOWDg1b0ZhVHQ%3DszoX-bfnjCU/'
        script.setAttribute('data-labels', 'y')
        script.setAttribute('data-placeholder', 'Buscar por dirección,ciudad, etc')
        script.setAttribute('data-dropdown', 'n')
        script.async = true
        
        harvestDiv.appendChild(script)
        scriptLoadedRef.current = true
        
        console.log('IDX Addons script injected into .harvest')
      } else {
        console.error('Harvest container not found')
      }
    }

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
          console.log('Cross-origin iframe - altura fija')
        }
      }
    }

    const timer = setTimeout(handleResize, 2000)
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      
      // Limpiar script
      const existingScript = document.getElementById('idxaddons-autocomplete-script')
      if (existingScript) {
        existingScript.remove()
        scriptLoadedRef.current = false
      }
    }
  }, [])

  return (
    <div className="w-full">
      {/* IDX Addons Autocomplete */}
      <div className="flex justify-center px-4 mb-6">
        <div className="w-full max-w-4xl">
          <div className="harvest"></div>
        </div>
      </div>

      {/* Iframe de IDX Broker */}
      <style>{`
        /* Estilos para centrar IDX Addons */
        .harvest {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .harvest > * {
          width: 100%;
          max-width: 100%;
        }

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
