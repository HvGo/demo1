---
description: Implementación de robots.txt y sitemap.xml optimizados para Google
---

# SEO: robots.txt y sitemap.xml - Guía de Implementación

## ✅ Archivos Creados

### 1. **robots.txt** (`/public/robots.txt`)
- Optimizado para Google, Bing y otros buscadores
- Bloquea bots agresivos (Ahrefs, Semrush, etc.)
- Permite crawling eficiente de páginas importantes
- Incluye crawl-delay y request-rate

**Características principales:**
- ✅ Permite indexación de `/properties` y `/properties-filtered`
- ✅ Bloquea `/api`, `/admin`, `/dashboard`
- ✅ Bloquea parámetros dinámicos que crean duplicados
- ✅ Bloquea bots agresivos que consumen crawl budget
- ✅ Referencia a sitemaps

### 2. **sitemap.xml** (`/public/sitemap.xml`)
- Sitemap estático con todas las páginas principales
- Incluye prioridades y frecuencia de cambio
- Válido para Google, Bing, Yahoo

### 3. **sitemap.ts** (`/src/app/sitemap.ts`)
- Generador dinámico de sitemap (Next.js 13+)
- Se actualiza automáticamente en cada build
- Mejor que sitemap estático

## 🔧 Configuración Requerida

### 1. Actualizar dominio en robots.txt y sitemap.xml

**Busca y reemplaza:**
```
https://ivanutahrealtor.com
```

**Con tu dominio real:**
```
https://tudominio.com
```

**Archivos a actualizar:**
- `/public/robots.txt` (línea ~155)
- `/public/sitemap.xml` (todas las URLs)
- `/src/app/sitemap.ts` (línea 8)

### 2. Crear tabla en BD para tracking de sitemaps (opcional)

```sql
CREATE TABLE sitemap_submissions (
  id SERIAL PRIMARY KEY,
  url VARCHAR(500) NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50),
  google_response TEXT
);
```

## 📋 Checklist de Implementación

- [ ] Actualizar dominio en `robots.txt`
- [ ] Actualizar dominio en `sitemap.xml`
- [ ] Actualizar dominio en `sitemap.ts`
- [ ] Reiniciar servidor (`npm run dev`)
- [ ] Verificar que `/robots.txt` sea accesible
- [ ] Verificar que `/sitemap.xml` sea accesible
- [ ] Verificar que `sitemap.xml` (dinámico) sea accesible

## 🧪 Validación Local

### 1. Verificar robots.txt

```bash
# En terminal, desde la raíz del proyecto
curl http://localhost:3000/robots.txt
```

**Esperado:** Ver el contenido completo del robots.txt

### 2. Verificar sitemap.xml

```bash
curl http://localhost:3000/sitemap.xml
```

**Esperado:** Ver XML con URLs listadas

### 3. Verificar sitemap dinámico

```bash
curl http://localhost:3000/sitemap.xml
```

**Esperado:** Mismo resultado que arriba (Next.js sirve ambos)

## 🌐 Validación en Google Search Console

### 1. Acceder a Google Search Console
- Ir a: https://search.google.com/search-console
- Agregar propiedad con tu dominio

### 2. Enviar robots.txt
- Ir a: Configuración > Rastreadores > robots.txt
- Verificar que no hay errores

### 3. Enviar sitemap
- Ir a: Sitemaps
- Clic en "Agregar sitemap"
- Ingresar: `https://tudominio.com/sitemap.xml`
- Clic en "Enviar"

### 4. Verificar cobertura
- Ir a: Cobertura
- Debería mostrar:
  - ✅ Válido (páginas indexadas)
  - ⚠️ Excluido por robots.txt (páginas bloqueadas)
  - ❌ Error (si hay problemas)

## 📊 Monitoreo Continuo

### En Google Search Console:

1. **Cobertura**
   - Monitorear páginas indexadas vs excluidas
   - Asegurar que `/properties` y `/properties-filtered` estén indexadas

2. **Rendimiento**
   - Ver qué páginas aparecen en búsquedas
   - Monitorear CTR (click-through rate)

3. **Rastreabilidad**
   - Ver cuántas páginas rastrea Google por día
   - Optimizar crawl budget si es necesario

4. **Errores de rastreo**
   - Revisar si hay errores 404 o 500
   - Corregir URLs rotas

## 🚀 Próximos Pasos

### 1. Crear sitemaps adicionales (cuando tengas muchas propiedades)

```
sitemap-properties.xml    (todas las propiedades)
sitemap-blog.xml          (artículos del blog)
sitemap-pages.xml         (páginas estáticas)
```

**En robots.txt:**
```
Sitemap: https://tudominio.com/sitemap.xml
Sitemap: https://tudominio.com/sitemap-properties.xml
Sitemap: https://tudominio.com/sitemap-blog.xml
```

### 2. Crear robots.txt dinámico (si necesitas cambios frecuentes)

```typescript
// /src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/properties', '/contact-us'],
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: 'https://tudominio.com/sitemap.xml',
  }
}
```

### 3. Monitorear bots agresivos

En Google Search Console:
- Ir a: Configuración > Rastreadores
- Ver qué bots acceden a tu sitio
- Bloquear en robots.txt si es necesario

## 📚 Referencias de Google

- [Guía de robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Guía de sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Crawl budget](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget)
- [Search Console Help](https://support.google.com/webmasters)

## 🎯 Mejores Prácticas Implementadas

✅ **Crawl Budget Optimization**
- Bloqueadas rutas innecesarias
- Permitidas solo páginas importantes
- Crawl-delay configurado

✅ **Duplicate Content Prevention**
- Bloqueados parámetros dinámicos
- Bloqueadas versiones alternativas

✅ **Bot Management**
- Bloqueados bots agresivos
- Permitidos bots de búsqueda principales

✅ **Sitemap Best Practices**
- Incluidas todas las páginas importantes
- Prioridades configuradas correctamente
- Frecuencia de cambio realista

✅ **Google Compliance**
- Sigue todas las directrices de Google
- Compatible con Bing y otros buscadores
- Optimizado para algoritmos actuales

## ⚠️ Errores Comunes a Evitar

❌ **NO hacer:**
- Bloquear `/` (homepage)
- Bloquear `/properties` (contenido importante)
- Usar crawl-delay muy alto (ralentiza indexación)
- Olvidar actualizar dominio en URLs

✅ **SÍ hacer:**
- Revisar regularmente en Search Console
- Actualizar sitemap cuando agregues propiedades
- Monitorear errores de rastreo
- Usar Google Search Console para validar cambios

## 📞 Soporte

Si tienes problemas:
1. Verifica que robots.txt sea válido en: https://www.seobility.net/en/seotools/robots-txt-validator/
2. Verifica sitemap en: https://www.xml-sitemaps.com/validate-xml-sitemap.html
3. Revisa Google Search Console para errores específicos
