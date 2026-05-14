/**
 * IDX Broker Property Capture Script
 * Inyectado en el iframe para detectar clics en propiedades automáticamente
 * 
 * Este script se comunica con la página padre usando postMessage
 */

(function() {
  console.log('[IDX_CAPTURE] Script initialized in iframe')

  // Detectar clics en propiedades
  document.addEventListener('click', function(event) {
    // Buscar el elemento de propiedad más cercano
    const propertyElement = event.target.closest('[data-property-id], .property-listing, .listing-item, [class*="property"], [class*="listing"]')
    
    if (propertyElement) {
      console.log('[IDX_CAPTURE] Property element clicked:', propertyElement)
      
      // Intentar extraer property ID de varios atributos
      let propertyId = null
      let propertyUrl = null
      
      // Método 1: data-property-id
      propertyId = propertyElement.getAttribute('data-property-id')
      
      // Método 2: href del link
      const link = propertyElement.querySelector('a[href*="/details/"]')
      if (link && !propertyId) {
        const href = link.getAttribute('href')
        const match = href.match(/\/details\/(\d+)/)
        if (match) {
          propertyId = match[1]
          propertyUrl = href.startsWith('http') ? href : window.location.origin + href
        }
      }
      
      // Método 3: buscar en el HTML del elemento
      if (!propertyId) {
        const html = propertyElement.innerHTML
        const match = html.match(/\/details\/(\d+)/)
        if (match) {
          propertyId = match[1]
        }
      }
      
      if (propertyId) {
        console.log('[IDX_CAPTURE] Property ID detected:', propertyId)
        
        // Construir URL si no la tenemos
        if (!propertyUrl) {
          propertyUrl = window.location.origin + '/idx/details/' + propertyId
        }
        
        // Enviar mensaje a la página padre
        window.parent.postMessage({
          type: 'PROPERTY_SELECTED',
          propertyId: propertyId,
          propertyUrl: propertyUrl,
          timestamp: new Date().toISOString()
        }, '*')
        
        console.log('[IDX_CAPTURE] Message sent to parent:', {
          propertyId,
          propertyUrl
        })
      }
    }
  }, true) // Usar captura para detectar clics antes que otros listeners

  // También monitorear cambios en el DOM (para navegación interna)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        // Buscar propiedades nuevas que se hayan agregado
        const properties = document.querySelectorAll('[data-property-id], .property-listing, .listing-item')
        console.log('[IDX_CAPTURE] DOM changed, found', properties.length, 'property elements')
      }
    })
  })

  // Observar cambios en el documento
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-property-id', 'href']
  })

  console.log('[IDX_CAPTURE] Monitoring enabled for property clicks')
})()
