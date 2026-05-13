'use client'

import { useEffect } from 'react'

interface IDXBrokerWidgetEmbedProps {
  widgetId?: string
}

export default function IDXBrokerWidgetEmbed({ widgetId = '153868' }: IDXBrokerWidgetEmbedProps) {
  useEffect(() => {
    // Cargar el script del widget de IDX Broker
    const script = document.createElement('script')
    script.charset = 'UTF-8'
    script.type = 'text/javascript'
    script.id = `idxwidgetsrc-${widgetId}`
    script.src = `https://ivanutahrealtor.idxbroker.com/idx/widgets/${widgetId}`
    script.async = true
    script.defer = true
    
    // Agregar el script al contenedor del widget
    const container = document.getElementById(`idx-widget-container-${widgetId}`)
    if (container) {
      container.appendChild(script)
    } else {
      document.body.appendChild(script)
    }

    return () => {
      // Limpiar el script cuando el componente se desmonte
      const existingScript = document.getElementById(`idxwidgetsrc-${widgetId}`)
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [widgetId])

  return (
    <div 
      id={`idx-widget-container-${widgetId}`}
      className="w-full min-h-screen"
      style={{ minHeight: '600px' }}
    >
      {/* El widget de IDX Broker se renderizará aquí */}
    </div>
  )
}
