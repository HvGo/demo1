# IDX Broker Customization Guide
## CSS y Configuraciones Personalizadas para Mejorar UX

---

## 📋 Tabla de Contenidos
1. [CSS para Ocultar Elementos](#css-para-ocultar-elementos)
2. [CSS para Mejorar Estilos](#css-para-mejorar-estilos)
3. [Script para Sticky Header](#script-para-sticky-header)
4. [Cómo Implementar en IDX Broker](#cómo-implementar-en-idx-broker)

---

## 1. CSS Actual (Ya Implementado)

Tu CSS actual en IDX Broker:

```css
/*#IDX-main {
width: 80% !important;
margin-left: auto !important;
margin-right: auto !important;
margin-top: 30px !important;
}*/
div#IDX-main {
    padding: 0 10%;
    margin-top: 30px !important;
}

.live-theme .ui-widget-header {
    background: #f6f6f6 !important;
    border-radius: 0;
    border: 0;
}
.ui-widget.IDX-registrationModal p {
    font-size: 16px;
}

#IDX-Subheader-SavedLink > div.savedlink-header {
  width: 103%;
  margin-left: -1%;
}

#IDX-Subheader-SavedLink > div.savedlink-header > div > div > div > div > h1 > span{
    font-size: 35px !important;
}

.IDX-topAction {
  justify-content:center;
}

.IDX-btn--link.IDX-btn--link.IDX-btn--rounded {
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  border-radius: 0px;
}

.IDX-top-action__group--no-refinement {
  justify-content: center;
}

#searchSetup #middlewareSearch #IDX-main .IDX-btn.IDX-btn__PL, #IDX-main.IDX-wrapper-standard .IDX-btn.IDX-btn__PL {
  border-radius: 0px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  color:  #FFFFFF;
}

#idx-results-content {
  min-height:100%;
}

.theme footer.page-footer {
  margin-top:300px !important;    
  float: left;    
  width: 100%;    
  min-height: 60px;
}

.theme nav li>a {                            
  justify-content: center;
    padding: 14px 15px;
    display: inline-block;
    line-height: 0px !important;
    position: relative;
    box-sizing: border-box;
    z-index: 9;
}
```

---

## 2. CSS para Ocultar Elementos (Agregar a tu CSS actual)

### Ocultar Botones "New Search" y "Modify Search"

Basándome en tu CSS actual, los botones están en `.IDX-topAction`. Agrega esto:

```css
/* Ocultar botones 'NEW SEARCH' y 'MODIFY SEARCH' */
.IDX-topAction .IDX-btn--link {
  display: none !important;
}

/* Alternativa más específica */
.IDX-topAction .IDX-btn--link.IDX-btn--rounded {
  display: none !important;
}
```

### Ocultar Mensaje "SHOWING 500 LISTINGS..."

```css
/* Ocultar mensaje de resultados */
.IDX-topAction__group--no-refinement {
  display: none !important;
}

/* Alternativa: Si está en otro contenedor */
[class*="showing"],
[class*="listings-info"],
.idx-results-info {
  display: none !important;
}
```

### Ocultar Contador "500 LISTINGS"

```css
/* Ocultar contador de propiedades */
.IDX-results-count,
[class*="result-count"],
.listings-count-display {
  display: none !important;
}
```

---

## 2. CSS para Mejorar Estilos

### Mejorar Espaciado y Padding

```css
/* Aumentar espaciado en los resultados */
.listings-container {
  padding: 20px !important;
  margin: 20px 0 !important;
}

/* Mejorar espaciado entre propiedades */
.listing-item,
[class*="property-card"],
[class*="listing-card"] {
  margin-bottom: 20px !important;
  padding: 15px !important;
  border-radius: 8px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}
```

### Mejorar Filtros

```css
/* Hacer filtros más visibles */
.filter-section,
[class*="filter-group"],
.search-filters {
  background-color: #f5f5f5 !important;
  padding: 15px !important;
  border-radius: 6px !important;
  margin-bottom: 20px !important;
}

/* Mejorar botones de filtro */
.filter-button,
[class*="filter-btn"],
button[class*="filter"] {
  background-color: #0066cc !important;
  color: white !important;
  padding: 10px 20px !important;
  border-radius: 4px !important;
  border: none !important;
  cursor: pointer !important;
  transition: background-color 0.3s !important;
}

.filter-button:hover,
[class*="filter-btn"]:hover,
button[class*="filter"]:hover {
  background-color: #0052a3 !important;
}
```

### Mejorar Imágenes de Propiedades

```css
/* Hacer imágenes más atractivas */
.listing-image,
[class*="property-image"],
.property-photo {
  border-radius: 8px !important;
  overflow: hidden !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  transition: transform 0.3s ease !important;
}

.listing-image:hover,
[class*="property-image"]:hover,
.property-photo:hover {
  transform: scale(1.05) !important;
}
```

### Mejorar Tipografía

```css
/* Mejorar títulos de propiedades */
.listing-title,
[class*="property-title"],
.property-address {
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #333 !important;
  margin-bottom: 8px !important;
}

/* Mejorar descripción de propiedades */
.listing-description,
[class*="property-description"],
.property-details {
  font-size: 14px !important;
  color: #666 !important;
  line-height: 1.6 !important;
}

/* Mejorar precio */
.listing-price,
[class*="property-price"],
.price-display {
  font-size: 24px !important;
  font-weight: bold !important;
  color: #0066cc !important;
  margin: 10px 0 !important;
}
```

---

## 3. Script para Sticky Header

Si quieres ocultar el sticky header mientras se abre el lightbox (como mencionaste antes):

```javascript
<script type="text/javascript">
window.addEventListener("load", function(event) {
  // Watch for lightbox changes
  var observerLightBox = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
      // Hide sticky header elements
      var headerImage = document.getElementsByClassName('edgtf-title-image')[0];
      var headerHolder = document.getElementsByClassName('edgtf-title-holder')[0];
      
      if (headerImage) headerImage.style.display = 'none';
      if (headerHolder) headerHolder.style.display = 'none';
      
      // Detect lightbox close button
      var exitLightBox = document.getElementsByClassName("idx-lightbox__button-dismiss");
      var exitfunction = function(){
        // Restore sticky header after lightbox closes
        if (headerImage) headerImage.style.display = 'inline-block';
        if (headerHolder) headerHolder.style.display = 'inline-block';
      }
      
      for (var z = exitLightBox.length - 1; z >= 0; z--) {
        exitLightBox[z].addEventListener('click', exitfunction, false);
      }
    });
  });
  
  var lightBox = document.getElementsByClassName('idx-lightbox__outer')[0];
  if (lightBox) {
    observerLightBox.observe(lightBox, { attributes : true, attributeFilter : ['style'] });
  }
});
</script>
```

---

## 4. Cómo Implementar en IDX Broker (Instrucciones Correctas)

### Paso 1: Acceder a Custom CSS
1. Inicia sesión en tu cuenta IDX Broker
2. Ve a: **DESIGN** → **Website** → **Custom CSS**

### Paso 2: Seleccionar la Página
En la interfaz de Custom CSS, verás varias opciones de páginas:
- **Global** - Aplica a todas las páginas
- **Categories** - Aplica a páginas de categorías
- **Pages** - Aplica a páginas específicas
- **Saved Links** - Aplica a búsquedas guardadas

Selecciona la pestaña **Pages** (como ves en la imagen)

### Paso 3: Seleccionar la Página Específica
En el lado izquierdo, verás una lista de páginas:
- **proper** (proper) - Página de detalles de propiedades
- **provo** - Otra página
- Y otras ciudades/páginas disponibles

Selecciona **proper** (que es donde quieres aplicar los cambios)

### Paso 4: Agregar el CSS Personalizado
En el área de texto derecha, agrega tu CSS personalizado:

```css
/* ========== OCULTAR ELEMENTOS ========== */

/* Ocultar header móvil */
#IDX-mobile-listings-header {
  display: none !important;
}

/* Ocultar contador de resultados "500 results returned" */
#IDX-resultsCountWrap {
  display: none !important;
}

/* Ocultar mensaje "Your search returned more than the maximum number of listings..." */
#IDX-resultsCountMessage {
  display: none !important;
}

/* Ocultar enlaces superiores (Save Search, New Search, Modify Search) */
#IDX-resultsTopLinks {
  display: none !important;
}

/* Alternativa: Ocultar elementos individuales si el contenedor no funciona */
#IDX-saveSearch {
  display: none !important;
}

#IDX-resultsLinkNew {
  display: none !important;
}

#IDX-resultsLinkModify {
  display: none !important;
}

/* Ocultar mensaje "SHOWING 500 LISTINGS, TRY NARROWING YOUR SEARCH" */
.IDX-alert.IDX-results__alert {
  display: none !important;
}

/* Ocultar contador "500 LISTINGS" */
.idx-results-total__heading {
  display: none !important;
}

/* Ocultar disclaimer/información de copyright y MLS */
div[style*="text-align:left"][style*="padding:10px 0"] {
  display: none !important;
}

/* Alternativa: Ocultar el contenedor completo del contador */
.idx-results-total {
  display: none !important;
}

/* ========== OCULTAR TODOS LOS BOTONES DEL FORMULARIO ========== */

/* Ocultar botón "APPLY FILTERS" */
#IDX-refineSubmit {
  display: none !important;
}

/* Ocultar botón "SAVE SEARCH" */
#IDX-saveSearch {
  display: none !important;
}

/* Ocultar todos los botones dropdown (ANY PRICE, BEDS, BATHS, MORE FILTERS) */
.IDX-btn-primary.IDX-dropdown-toggle,
.IDX-btn-primary[aria-haspopup="true"] {
  display: none !important;
}

/* ========== OCULTAR BOTONES EN PÁGINA DE DETALLES ========== */

/* Ocultar botón "New Search" */
#IDX-detailsActionNew {
  display: none !important;
}

/* Ocultar botón "Modify Search" */
#IDX-detailsActionModify {
  display: none !important;
}

/* Ocultar botón "Back to Results" */
#IDX-detailsActionBack {
  display: none !important;
}

/* Ocultar botones "Prev Property" y "Next Property" */
#IDX-nextLastButtons {
  display: none !important;
}

/* Alternativa: Ocultar el formulario completo de refinamiento */
/* #IDX-refinementSearchForm {
  display: none !important;
} */

/* ========== AJUSTAR ANCHO DE LA PÁGINA ========== */

/* Contenedor principal con márgenes laterales */
body,
#IDX-main,
.IDX-container {
  max-width: 1200px !important;
  margin: 0 auto !important;
  padding: 0 20px !important;
}

/* ========== EXPANDIR CONTENEDOR DE PROPIEDADES ========== */

/* Expandir el contenedor principal de resultados */
#idx-results-content {
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Expandir el contenedor de categoría de propiedades */
#idx-results-category-active {
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 20px !important;
}

/* Expandir el grid de propiedades para ocupar más espacio */
.idx-results__category {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
  gap: 15px !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 15px !important;
}

/* Mobile: Una columna en pantallas pequeñas */
@media (max-width: 640px) {
  .idx-results__category {
    grid-template-columns: 1fr !important;
    gap: 12px !important;
    padding: 10px !important;
  }
}

/* Tablet: Dos columnas en pantallas medianas */
@media (min-width: 641px) and (max-width: 1024px) {
  .idx-results__category {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 15px !important;
    padding: 15px !important;
  }
}

/* Hacer que cada tarjeta de propiedad sea más grande */
.idx-results__listing {
  width: 100% !important;
  margin: 0 !important;
}

.idx-listing-card {
  width: 100% !important;
  height: 100% !important;
}

/* Expandir el contenedor principal IDX */
div#IDX-main {
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
}
```

### Paso 5: Seleccionar el Dispositivo
Elige el dispositivo donde aplicar los cambios:
- **Desktop** - Para computadoras
- **Mobile** - Para dispositivos móviles
- **Printable** - Para impresión

Puedes aplicar el CSS a todos los dispositivos o específicamente a uno.

### Paso 6: Guardar Cambios
1. Haz clic en el botón verde **Save Changes**
2. Espera a que se actualice el sitio (puede tomar 1-2 minutos)
3. Verifica los cambios en tu sitio

---

## 📝 Recomendaciones

### Para Ocultar Elementos:
- **Usa `display: none !important`** - Asegura que el CSS se aplique
- **Prueba con selectores amplios primero** - Si no funciona, intenta con selectores más específicos
- **Inspecciona con F12** - Abre DevTools y busca las clases reales de los elementos

### Para Mejorar Estilos:
- **Mantén consistencia** - Usa los mismos colores y espaciados en todo el sitio
- **Prueba en móvil** - Asegúrate de que se vea bien en dispositivos pequeños
- **No sobrecargues** - Menos es más, evita demasiadas sombras y efectos

### Para Scripts:
- **Prueba primero en consola** - Abre F12 → Console y prueba el código
- **Usa try-catch** - Envuelve el código en try-catch para evitar errores
- **Documenta cambios** - Comenta qué hace cada sección

---

## 🔍 Troubleshooting

### Los cambios no se aplican:
1. Limpia la caché del navegador (Ctrl+Shift+Delete)
2. Espera 5-10 minutos a que IDX Broker actualice
3. Intenta en una ventana privada/incógnito

### El CSS no funciona:
1. Verifica que uses `!important` en los selectores
2. Inspecciona el elemento (F12) para encontrar la clase correcta
3. Intenta con selectores más específicos

### El script causa errores:
1. Abre la consola (F12 → Console) y busca errores
2. Envuelve el código en `try-catch`
3. Verifica que los elementos existan antes de manipularlos

---

## 📞 Soporte

Si necesitas ayuda:
1. Contacta al soporte de IDX Broker: support@idxbroker.com
2. Comparte el código CSS/JavaScript que intentaste agregar
3. Proporciona capturas de pantalla del resultado

---

## 📱 CSS MOBILE RESPONSIVE (Sección Separada)

Copia este CSS si necesitas aplicar cambios específicos para móviles y tablets:

```css
/* ========== RESPONSIVE GRID PARA MÓVILES Y TABLETS ========== */

/* Mobile: Una columna en pantallas pequeñas (≤640px) */
@media (max-width: 640px) {
  .idx-results__category {
    grid-template-columns: 1fr !important;
    gap: 12px !important;
    padding: 10px !important;
  }
  
  #idx-results-category-active {
    padding: 0 10px !important;
  }
  
  div#IDX-main {
    padding: 0 !important;
  }
}

/* Tablet: Dos columnas en pantallas medianas (641px - 1024px) */
@media (min-width: 641px) and (max-width: 1024px) {
  .idx-results__category {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 15px !important;
    padding: 15px !important;
  }
  
  #idx-results-category-active {
    padding: 0 15px !important;
  }
}

/* Desktop: Múltiples columnas (≥1025px) */
@media (min-width: 1025px) {
  .idx-results__category {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
    gap: 15px !important;
    padding: 15px !important;
  }
}
```

---

**Última actualización:** Mayo 14, 2026
