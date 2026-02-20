# Schema Markup Dinámico - Guía de Implementación y Mantenimiento

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Arquitectura](#arquitectura)
3. [Tipos de Schema Implementados](#tipos-de-schema-implementados)
4. [Cómo Usar](#cómo-usar)
5. [Agregar Nuevos Schemas](#agregar-nuevos-schemas)
6. [Validación y Testing](#validación-y-testing)
7. [Monitoreo](#monitoreo)
8. [Troubleshooting](#troubleshooting)

---

## Introducción

Schema Markup dinámico permite que Google entienda mejor el contenido de tu sitio web. Esto mejora:
- ✅ Rich Results en búsqueda
- ✅ CTR (Click-Through Rate)
- ✅ Posicionamiento en búsqueda
- ✅ Experiencia de usuario

**Beneficio esperado:** +15-30% tráfico orgánico en 6 meses

---

## Arquitectura

### Componentes

```
┌─────────────────────────────────────────┐
│         Next.js Page (Server)           │
│  (Hero, Property, FAQs, etc.)           │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│   getSchemaMarkupByKey('key')           │
│   (src/lib/queries/schema.ts)           │
└──────────────┬──────────────────────────┘
               │
               ├─► Redis Cache (1 hora)
               │
               └─► PostgreSQL (schema_markup)
                   
┌─────────────────────────────────────────┐
│   validateSchema()                      │
│   sanitizeSchema()                      │
│   (src/lib/schema/validator.ts)         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│   <SchemaMarkup schema={data} />        │
│   (src/components/SchemaMarkup.tsx)     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│   <script type="application/ld+json">   │
│   (Inyectado en <head>)                 │
└─────────────────────────────────────────┘
```

### Base de Datos

**Tabla: `schema_markup`**
```sql
- id (PK)
- key (UNIQUE) - Identificador único
- schema_type - Tipo de schema (Organization, RealEstateProperty, etc.)
- schema_data (JSONB) - Datos del schema
- is_active - Si está activo
- priority - Orden de renderizado
- created_at, updated_at
```

**Tabla: `schema_audit_log`**
```sql
- id (PK)
- schema_key (FK)
- old_data (JSONB) - Datos anteriores
- new_data (JSONB) - Datos nuevos
- changed_by - Quién hizo el cambio
- changed_at - Cuándo se hizo el cambio
```

---

## Tipos de Schema Implementados

### 1. Organization Schema
**Key:** `organization`

Información sobre tu empresa/organización.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Real Estate Company",
  "url": "https://yourdomain.com",
  "logo": "https://yourdomain.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+1-XXX-XXX-XXXX"
  }
}
```

### 2. LocalBusiness Schema
**Key:** `local_business`

Información sobre tu negocio local.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Real Estate Services",
  "address": { ... },
  "telephone": "+1-XXX-XXX-XXXX",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150"
  }
}
```

### 3. RealEstateProperty Schema
**Key:** `real_estate_property`

Información sobre propiedades inmobiliarias.

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateProperty",
  "name": "Luxury Home",
  "price": "500000",
  "priceCurrency": "USD",
  "numberOfBedrooms": "4",
  "address": { ... }
}
```

### 4. BreadcrumbList Schema
**Key:** `breadcrumb_list`

Navegación/migas de pan.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yourdomain.com"
    }
  ]
}
```

### 5. FAQPage Schema
**Key:** `faq_page`

Preguntas frecuentes.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I search?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the search bar..."
      }
    }
  ]
}
```

---

## Cómo Usar

### En una Página (Server Component)

```typescript
// app/page.tsx
import { getSchemaMarkupByKey } from '@/lib/queries/schema'
import { SchemaMarkup } from '@/components/SchemaMarkup'

export default async function HomePage() {
  const schema = await getSchemaMarkupByKey('organization')
  
  return (
    <>
      <SchemaMarkup schema={schema?.schemaData} />
      {/* Contenido de la página */}
    </>
  )
}
```

### Con Datos Dinámicos

```typescript
export default async function PropertyPage({ params }) {
  const property = await getProperty(params.id)
  const baseSchema = await getSchemaMarkupByKey('real_estate_property')
  
  // Enriquecer schema con datos dinámicos
  const enrichedSchema = {
    ...baseSchema?.schemaData,
    name: property.title,
    price: property.price,
    address: {
      streetAddress: property.address,
      addressLocality: property.city
    }
  }
  
  return (
    <>
      <SchemaMarkup schema={enrichedSchema} />
      {/* Contenido */}
    </>
  )
}
```

---

## Agregar Nuevos Schemas

### Paso 1: Definir en BD

```sql
INSERT INTO schema_markup (key, schema_type, schema_data, is_active, priority)
VALUES (
  'my_new_schema',
  'MySchemaType',
  '{
    "@context": "https://schema.org",
    "@type": "MySchemaType",
    "name": "...",
    ...
  }'::jsonb,
  true,
  10
);
```

### Paso 2: Actualizar Validator (si es necesario)

```typescript
// src/lib/schema/validator.ts
const SCHEMA_REQUIREMENTS: Record<string, ...> = {
  MySchemaType: {
    required: ['@context', '@type', 'name'],
    optional: ['description', 'url'],
    type: 'MySchemaType'
  }
}
```

### Paso 3: Usar en Página

```typescript
const schema = await getSchemaMarkupByKey('my_new_schema')
return <SchemaMarkup schema={schema?.schemaData} />
```

---

## Validación y Testing

### Ejecutar Tests

```bash
npm test -- schema.test.ts
```

### Validar Schema Manualmente

```bash
curl http://localhost:3000/api/schema/organization
```

### Google Rich Results Test

1. Ir a: https://search.google.com/test/rich-results
2. Pegar URL: https://yourdomain.com/page
3. Verificar que Google detecta el schema

### JSON-LD Playground

1. Ir a: https://json-ld.org/playground/
2. Copiar schema JSON
3. Verificar estructura

---

## Monitoreo

### Google Search Console

1. Ir a: Google Search Console
2. Seleccionar propiedad
3. Ir a: Mejoras → Rich Results
4. Verificar:
   - ✅ Páginas con schema válido
   - ✅ Errores de schema
   - ✅ Tendencia a lo largo del tiempo

### Logs en Servidor

```bash
# Ver logs de schema
tail -f logs/schema.log

# Buscar errores
grep "SCHEMA ERROR" logs/schema.log
```

### Métricas Clave

```
✅ Páginas con schema válido: > 95%
✅ Tiempo de respuesta API: < 200ms
✅ Cache hit rate: > 80%
✅ Errores de validación: 0
✅ CTR en búsqueda: ↑ 15-30%
```

---

## Troubleshooting

### Schema no aparece en página

**Verificar:**
1. ¿Está el schema en BD?
   ```sql
   SELECT * FROM schema_markup WHERE key = 'my_key';
   ```

2. ¿Está activo?
   ```sql
   UPDATE schema_markup SET is_active = true WHERE key = 'my_key';
   ```

3. ¿Se está llamando correctamente?
   ```typescript
   const schema = await getSchemaMarkupByKey('my_key')
   console.log(schema) // Debe tener datos
   ```

### Schema inválido en Google

**Verificar:**
1. Usar JSON-LD Playground
2. Revisar errores de validación
3. Comparar con documentación de schema.org

### Performance lenta

**Soluciones:**
1. Verificar índices en BD
   ```sql
   CREATE INDEX idx_schema_key ON schema_markup(key);
   ```

2. Verificar cache en Redis
   ```bash
   redis-cli GET schema:organization
   ```

3. Revisar logs de performance
   ```
   [SCHEMA API] Schema fetch took 250ms
   ```

### Datos desincronizados

**Verificar:**
1. Revisar audit log
   ```sql
   SELECT * FROM schema_audit_log WHERE schema_key = 'my_key';
   ```

2. Comparar datos en página vs schema
3. Usar `validateConsistency()` para detectar diferencias

---

## Checklist de Mantenimiento

### Semanal
- [ ] Revisar Google Search Console
- [ ] Verificar errores de schema
- [ ] Revisar logs de performance

### Mensual
- [ ] Auditar todos los schemas
- [ ] Verificar cache hit rate
- [ ] Revisar audit log de cambios

### Trimestral
- [ ] Revisar cambios en schema.org
- [ ] Actualizar documentación
- [ ] Revisar impacto en tráfico orgánico

---

## Recursos

- **Schema.org:** https://schema.org
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **JSON-LD Playground:** https://json-ld.org/playground/
- **Google Search Central:** https://developers.google.com/search

---

## Contacto y Soporte

Para preguntas o problemas, contactar al equipo de SEO técnico.
