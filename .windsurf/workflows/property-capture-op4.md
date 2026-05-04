---
description: Opción 4 - Captura de datos de propiedades desde IDX Broker
---

# Opción 4: Captura Híbrida de Datos de Propiedades

## Descripción General
Implementación de captura automática de datos de propiedades cuando el usuario hace clic en una propiedad en el widget de IDX Broker. Los datos se extraen mediante scraping y se redirige al usuario al formulario de contacto con los datos precargados.

## Flujo de Ejecución

```
1. Usuario navega a /properties-filtered
   ↓
2. Widget IDX Broker se carga en iframe
   ↓
3. Usuario hace clic en una propiedad
   ↓
4. iframe navega a URL de detalles (ej: /idx/details/12345)
   ↓
5. Componente IDXBrokerWidgetIframe detecta cambio de URL
   ↓
6. Extrae property ID de la URL
   ↓
7. POST /api/capture-property con propertyId y propertyUrl
   ↓
8. Backend scraping extrae datos de la propiedad
   ↓
9. Datos se guardan en BD (TODO)
   ↓
10. Redirige a /contact-us?property_id=...&property_address=...&property_price=...
   ↓
11. Formulario precarga datos de la propiedad
   ↓
12. Usuario completa y envía formulario
```

## Archivos Implementados

### 1. Componente Frontend
**Archivo:** `src/components/Properties/IDXBrokerWidgetIframe.tsx`

**Funcionalidad:**
- Monitorea cambios de URL en el iframe cada 500ms
- Detecta navegación a página de detalles de propiedad
- Extrae property ID usando regex: `/\/details\/(\d+)/`
- Llama a `/api/capture-property` con ID y URL
- Redirige a `/contact-us` con datos precargados

**Logs:**
- `[PROPERTY_CAPTURE] Detected property click: {propertyId}`
- `[PROPERTY_CAPTURE] Capturing property: {propertyId}`
- `[PROPERTY_CAPTURE] Success: {data}`

### 2. Endpoint Backend
**Archivo:** `src/app/api/capture-property/route.ts`

**Método:** POST
**Body:**
```json
{
  "propertyId": "12345",
  "propertyUrl": "https://ivanutahrealtor.idxbroker.com/idx/details/12345"
}
```

**Response:**
```json
{
  "success": true,
  "address": "123 Main St, Salt Lake City, UT 84101",
  "price": "$450,000",
  "beds": 3,
  "baths": 2,
  "sqft": 2000,
  "yearBuilt": 2015,
  "lotSize": "0.25 acres",
  "type": "Single Family Home",
  "status": "Active",
  "message": "Property captured successfully"
}
```

### 3. Servicio de Scraping
**Archivo:** `src/lib/property-scraper.ts`

**Función:** `scrapePropertyDetails(propertyId, propertyUrl)`

**Extrae:**
- Address (dirección)
- Price (precio)
- Beds (recámaras)
- Baths (baños)
- Sqft (pies cuadrados)
- Year Built (año de construcción)
- Lot Size (tamaño del lote)
- Type (tipo de propiedad)
- Status (estado del listado)

**Nota:** Los selectores CSS deben ajustarse según la estructura HTML real de IDX Broker

### 4. Esquema de Base de Datos
**Archivo:** `src/lib/db-schema.ts`

**Tablas:**
- `property_captures`: Almacena datos de propiedades capturadas
- `contact_form_submissions`: Almacena envíos de formularios de contacto

**SQL incluido en el archivo para PostgreSQL/Neon**

## Próximos Pasos

### Fase 1: Testing (Actual)
- [ ] Reiniciar servidor
- [ ] Acceder a `/properties-filtered`
- [ ] Hacer clic en una propiedad
- [ ] Verificar logs en consola del navegador
- [ ] Verificar logs en terminal del servidor
- [ ] Confirmar redirección a `/contact-us`

### Fase 2: Ajustes de Scraping
- [ ] Inspeccionar HTML real de IDX Broker
- [ ] Ajustar selectores CSS en `property-scraper.ts`
- [ ] Probar extracción de datos
- [ ] Validar precisión de datos extraídos

### Fase 3: Integración con BD
- [ ] Crear tablas en Neon PostgreSQL
- [ ] Implementar guardado en BD en `/api/capture-property`
- [ ] Crear índices para búsquedas rápidas
- [ ] Implementar logging de capturas

### Fase 4: Integración con Formulario de Contacto
- [ ] Modificar `/contact-us` para aceptar query params
- [ ] Precarga de datos en formulario
- [ ] Vincular envío de formulario con property_capture
- [ ] Validar integridad de datos

### Fase 5: Mejoras Opcionales
- [ ] Caché de propiedades capturadas
- [ ] Historial de propiedades vistas por usuario
- [ ] Notificaciones de nuevas propiedades
- [ ] Análisis de propiedades más vistas

## Consideraciones Técnicas

### CORS y Seguridad
- El monitoreo de URL del iframe puede estar limitado por CORS
- El scraping se realiza en el backend (seguro)
- Los datos se validan antes de guardar en BD

### Performance
- Monitoreo de URL cada 500ms (ajustable)
- Scraping asincrónico (no bloquea UI)
- Caché recomendado para propiedades frecuentes

### Manejo de Errores
- Si el monitoreo falla, el usuario puede seguir usando el widget
- Si el scraping falla, se retorna estructura básica
- Si la redirección falla, se muestra error en consola

## Debugging

### Logs Disponibles
```
[PROPERTY_CAPTURE] Detected property click: {propertyId}
[PROPERTY_CAPTURE] Capturing property: {propertyId}
[PROPERTY_CAPTURE] Success: {data}
[PROPERTY_CAPTURE] Error: {error}
[SCRAPER] Fetching property details: {propertyId}
[SCRAPER] Successfully scraped property: {data}
[SCRAPER_ERROR] {error}
[CAPTURE_PROPERTY] Capturing property: {propertyId}
[CAPTURE_PROPERTY] Success: {data}
[CAPTURE_PROPERTY_ERROR] {error}
```

### Verificación de Funcionamiento
1. Abrir DevTools (F12)
2. Ir a pestaña Console
3. Buscar logs con `[PROPERTY_CAPTURE]`
4. Verificar Network tab para ver POST a `/api/capture-property`
5. Confirmar respuesta con datos de propiedad

## Notas Importantes

- El widget script NO es viable (conflictos de CORS y registro de componentes)
- El iframe SÍ es viable (permite monitoreo de URL)
- El scraping es fallback si no se pueden obtener datos del DOM
- La BD aún no está integrada (TODO)
- Los selectores CSS deben ajustarse a IDX Broker real
