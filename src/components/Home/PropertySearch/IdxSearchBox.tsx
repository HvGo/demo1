'use client'

import { useEffect, useRef } from 'react'

/**
 * Inyecta el widget de búsqueda con autocompletado de IDX Addons
 * dentro del contenedor `.harvest`, siguiendo el mismo patrón que
 * src/components/Properties/IDXPropertiesEmbed.tsx
 */
export default function IdxSearchBox() {
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (scriptLoadedRef.current) return
    scriptLoadedRef.current = true

    const harvestDiv = document.querySelector('.harvest')
    if (!harvestDiv) {
      console.error('Harvest container not found')
      return
    }

    // Evita duplicar el widget si el efecto se vuelve a ejecutar
    // (p. ej. doble invocación de Strict Mode en desarrollo)
    if (document.getElementById('idxaddons-autocomplete-script')) {
      return
    }
    harvestDiv.innerHTML = ''

    const script = document.createElement('script')
    script.id = 'idxaddons-autocomplete-script'
    script.src = 'https://idxaddons.com/addon/searchtool/Q1NOWDg1b0ZhVHQ%3DszoX-bfnjCU/'
    script.setAttribute('data-dropdown', 'n')
    script.async = true

    harvestDiv.appendChild(script)
    // Nota: no se remueve en cleanup a propósito — remover solo el <script>
    // no revierte el widget que este ya inyectó en el DOM, lo que produciría
    // el mismo efecto de duplicado al desmontar/remontar el componente.
  }, [])

  return <div className="harvest w-full" />
}
