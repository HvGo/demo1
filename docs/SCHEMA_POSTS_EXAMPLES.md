# Schema Markup para Posts - Ejemplos de Implementación

## 📚 Schemas Disponibles para Posts

### 1. BlogPosting
**Key:** `blog_post`

Para artículos de blog, tutoriales, guías.

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "5 Tips for Buying Your First Home",
  "description": "A comprehensive guide...",
  "image": "https://yourdomain.com/images/post.jpg",
  "datePublished": "2024-02-14T00:00:00Z",
  "dateModified": "2024-02-14T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "John Doe",
    "url": "https://yourdomain.com/author/john-doe"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Real Estate Company",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yourdomain.com/logo.png"
    }
  },
  "articleBody": "Full article content...",
  "wordCount": "1500",
  "url": "https://yourdomain.com/blog/5-tips-buying-home"
}
```

**Beneficios:**
- ✅ Aparece en Google Search con snippet mejorado
- ✅ Mejor CTR en búsqueda
- ✅ Posible aparición en Google News

---

### 2. NewsArticle
**Key:** `news_article`

Para noticias, anuncios, artículos de actualidad.

```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "New Real Estate Market Trends in 2024",
  "description": "Latest market analysis...",
  "image": ["https://yourdomain.com/images/news.jpg"],
  "datePublished": "2024-02-14T08:00:00Z",
  "dateModified": "2024-02-14T09:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Jane Smith",
    "url": "https://yourdomain.com/author/jane-smith"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Real Estate Company",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yourdomain.com/logo.png"
    }
  },
  "articleBody": "Full news content...",
  "url": "https://yourdomain.com/news/market-trends-2024"
}
```

**Beneficios:**
- ✅ Aparición en Google News
- ✅ Rich Results en búsqueda
- ✅ Mejor indexación de noticias

---

### 3. Article
**Key:** `article`

Para artículos genéricos, contenido editorial.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Understanding Real Estate Investment",
  "description": "A guide to real estate investing...",
  "image": "https://yourdomain.com/images/article.jpg",
  "datePublished": "2024-02-14T00:00:00Z",
  "dateModified": "2024-02-14T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Real Estate Company"
  },
  "articleBody": "Full article content...",
  "url": "https://yourdomain.com/article/real-estate-investing"
}
```

---

## 💻 Ejemplos de Implementación

### Ejemplo 1: Blog Post Simple

```typescript
// app/blog/[slug]/page.tsx
import { getSchemaMarkupByKey } from '@/lib/queries/schema'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { getPostBySlug } from '@/lib/queries/posts'

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug)
  const baseSchema = await getSchemaMarkupByKey('blog_post')
  
  // Enriquecer schema con datos del post
  const enrichedSchema = {
    ...baseSchema?.schemaData,
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      'name': post.author.name,
      'url': `https://yourdomain.com/author/${post.author.slug}`
    },
    articleBody: post.content,
    wordCount: post.wordCount,
    url: `https://yourdomain.com/blog/${post.slug}`
  }
  
  return (
    <>
      <SchemaMarkup schema={enrichedSchema} />
      <article>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        {/* Contenido del post */}
      </article>
    </>
  )
}
```

---

### Ejemplo 2: News Article con Múltiples Imágenes

```typescript
// app/news/[slug]/page.tsx
import { getSchemaMarkupByKey } from '@/lib/queries/schema'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { getNewsArticleBySlug } from '@/lib/queries/news'

export default async function NewsArticlePage({ params }) {
  const article = await getNewsArticleBySlug(params.slug)
  const baseSchema = await getSchemaMarkupByKey('news_article')
  
  const enrichedSchema = {
    ...baseSchema?.schemaData,
    headline: article.title,
    description: article.summary,
    image: article.images.map(img => img.url), // Array de imágenes
    datePublished: article.publishedAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      'name': article.reporter.name,
      'url': `https://yourdomain.com/author/${article.reporter.slug}`
    },
    articleBody: article.content,
    url: `https://yourdomain.com/news/${article.slug}`
  }
  
  return (
    <>
      <SchemaMarkup schema={enrichedSchema} />
      <article>
        <h1>{article.title}</h1>
        {/* Contenido */}
      </article>
    </>
  )
}
```

---

### Ejemplo 3: Post sobre Propiedad (Combinado)

```typescript
// app/blog/[slug]/page.tsx
import { getSchemaMarkupByKey } from '@/lib/queries/schema'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { getPostBySlug } from '@/lib/queries/posts'
import { getProperty } from '@/lib/queries/properties'

export default async function PropertyBlogPost({ params }) {
  const post = await getPostBySlug(params.slug)
  const baseSchema = await getSchemaMarkupByKey('blog_post')
  
  // Si el post menciona una propiedad específica
  let enrichedSchema = {
    ...baseSchema?.schemaData,
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      'name': post.author.name
    },
    articleBody: post.content,
    wordCount: post.wordCount,
    url: `https://yourdomain.com/blog/${post.slug}`
  }
  
  // Agregar propiedad mencionada si existe
  if (post.relatedPropertyId) {
    const property = await getProperty(post.relatedPropertyId)
    enrichedSchema.mentions = {
      '@type': 'RealEstateProperty',
      'name': property.title,
      'price': property.price,
      'priceCurrency': 'USD',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': property.address,
        'addressLocality': property.city,
        'addressRegion': property.state,
        'postalCode': property.zip
      },
      'url': `https://yourdomain.com/properties/${property.id}`
    }
  }
  
  return (
    <>
      <SchemaMarkup schema={enrichedSchema} />
      <article>
        <h1>{post.title}</h1>
        {/* Contenido */}
      </article>
    </>
  )
}
```

---

### Ejemplo 4: Lista de Posts (Breadcrumb + Schema)

```typescript
// app/blog/page.tsx
import { getSchemaMarkupByKey } from '@/lib/queries/schema'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { getAllPosts } from '@/lib/queries/posts'

export default async function BlogPage() {
  const posts = await getAllPosts()
  const breadcrumbSchema = await getSchemaMarkupByKey('breadcrumb_list')
  
  const enrichedBreadcrumb = {
    ...breadcrumbSchema?.schemaData,
    itemListElement: [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://yourdomain.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': 'https://yourdomain.com/blog'
      }
    ]
  }
  
  return (
    <>
      <SchemaMarkup schema={enrichedBreadcrumb} />
      <section>
        <h1>Blog</h1>
        <div className="posts-grid">
          {posts.map(post => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
```

---

## 🎯 Cuándo Usar Cada Schema

| Schema | Cuándo Usar | Ejemplo |
|--------|-----------|---------|
| **BlogPosting** | Artículos de blog, tutoriales, guías | "5 Tips for Buying a Home" |
| **NewsArticle** | Noticias, anuncios, actualizaciones | "Market Trends 2024" |
| **Article** | Contenido editorial genérico | "Understanding Real Estate" |

---

## ✅ Checklist para Posts

Antes de publicar un post, verificar:

- [ ] ¿Tiene título (headline)?
- [ ] ¿Tiene descripción (description)?
- [ ] ¿Tiene imagen (image)?
- [ ] ¿Tiene autor (author)?
- [ ] ¿Tiene fecha de publicación (datePublished)?
- [ ] ¿Tiene contenido (articleBody)?
- [ ] ¿Tiene URL correcta?
- [ ] ¿Schema valida en JSON-LD Playground?
- [ ] ¿Google Rich Results Test lo detecta?

---

## 🔍 Validar Schema de Post

### En JSON-LD Playground
```
1. Ir a: https://json-ld.org/playground/
2. Copiar schema JSON del post
3. Verificar que es válido
4. Ver estructura en el árbol
```

### En Google Rich Results Test
```
1. Ir a: https://search.google.com/test/rich-results
2. Pegar URL del post: https://yourdomain.com/blog/post-slug
3. Verificar que Google detecta el schema
4. Ver si hay errores o advertencias
```

---

## 📊 Beneficios Esperados para Posts

- ✅ +20-40% CTR en búsqueda (Rich Results)
- ✅ Mejor posicionamiento en búsqueda
- ✅ Posible aparición en Google News
- ✅ Mejor indexación de contenido
- ✅ Mejor experiencia en búsqueda

---

## 💡 Tips Avanzados

### 1. Agregar Comentarios al Schema
```typescript
const enrichedSchema = {
  ...baseSchema?.schemaData,
  // ... otros campos
  comment: [
    {
      '@type': 'Comment',
      'text': 'Great article!',
      'author': {
        '@type': 'Person',
        'name': 'Reader Name'
      },
      'dateCreated': '2024-02-14T10:00:00Z'
    }
  ]
}
```

### 2. Agregar Categorías
```typescript
const enrichedSchema = {
  ...baseSchema?.schemaData,
  // ... otros campos
  articleSection: 'Real Estate Tips',
  keywords: ['real estate', 'buying home', 'investment']
}
```

### 3. Agregar Tiempo de Lectura
```typescript
const enrichedSchema = {
  ...baseSchema?.schemaData,
  // ... otros campos
  timeRequired: 'PT10M' // 10 minutos
}
```

---

## 🚀 Próximos Pasos

1. Ejecutar SQL en Neon para agregar schemas de posts
2. Crear componentes para blog, news, articles
3. Integrar SchemaMarkup en cada página
4. Validar en Google Rich Results Test
5. Monitorear en Google Search Console

---

**Listo para crear posts con Schema Markup dinámico.**
