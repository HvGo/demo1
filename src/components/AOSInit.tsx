'use client'

import { useEffect } from 'react'

export function AOSInit() {
  useEffect(() => {
    // Importar AOS dinámicamente para evitar problemas de SSR
    import('aos').then((AOS) => {
      AOS.default.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-out',
      })
    })

    // Reinicializar AOS cuando el contenido cambia
    const handleRouteChange = () => {
      import('aos').then((AOS) => {
        AOS.default.refresh()
      })
    }

    window.addEventListener('load', handleRouteChange)
    return () => {
      window.removeEventListener('load', handleRouteChange)
    }
  }, [])

  return null
}
