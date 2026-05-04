'use client'

import dynamic from 'next/dynamic'

const IDXBrokerWidgetIframe = dynamic(() => import('./IDXBrokerWidgetIframe'), {
  ssr: false,
  loading: () => (
    <div className="p-12 text-center text-gray-500">
      <div className="inline-block">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-navy mb-4"></div>
        <p className="text-lg">Cargando propiedades...</p>
      </div>
    </div>
  ),
})

export default function PropertiesFilteredClient() {
  return <IDXBrokerWidgetIframe />
}
