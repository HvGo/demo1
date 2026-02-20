# Integración de Schema Markup en Blog Posts

## 📋 Descripción

Esta guía explica cómo integrar Schema Markup dinámico en tus posts de blog existentes usando la tabla `blog_posts` que ya tienes.

---

## 🔧 Componentes Creados

### 1. **Query: `getBlogPostBySlugWithMetadata`**
**Archivo:** `src/lib/queries/blog.ts`

Obtiene un post de blog con todos los metadatos necesarios para generar el schema:
- Título, descripción, imagen
- Contenido (para calcular word count)
- Autor, fecha de publicación
- Calcula automáticamente el word count

```typescript
const post = await getBlogPostBySlugWithMetadata('my-post-slug')
// Retorna: { slug, title, excerpt, content, author, publishedAt, wordCount, ... }
```

### 2. **Componente: `BlogPostSchema`**
**Archivo:** `src/components/Blog/BlogPostSchema.tsx`

Server Component que genera el schema JSON-LD enriquecido:
- Obtiene template de `schema_markup` (key='blog_post')
- Enriquece con datos reales del post
- Inyecta en `<head>` automáticamente

---

## 💻 Cómo Usar

### Opción 1: En una Página de Blog Post

```typescript
// app/blog/[slug]/page.tsx
import { getBlogPostBySlugWithMetadata } from '@/lib/queries/blog'
import { BlogPostSchema } from '@/components/Blog/BlogPostSchema'

export default async function BlogPostPage({ params }) {
  const post = await getBlogPostBySlugWithMetadata(params.slug)
  
  if (!post) {
    return <div>Post not found</div>
  }
  
  return (
    <>
      <BlogPostSchema post={post} baseUrl="https://yourdomain.com" />
      
      <article>
        <h1>{post.title}</h1>
        <p className="text-gray-600">{post.excerpt}</p>
        
        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} />
        )}
        
        <div className="prose">
          {/* Renderizar contenido markdown */}
          {post.content}
        </div>
        
        <footer>
          <p>By {post.author}</p>
          <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
        </footer>
      </article>
    </>
  )
}
```

### Opción 2: Con Markdown Renderer

```typescript
// app/blog/[slug]/page.tsx
import { getBlogPostBySlugWithMetadata } from '@/lib/queries/blog'
import { BlogPostSchema } from '@/components/Blog/BlogPostSchema'
import { marked } from 'marked' // o tu librería de markdown

export default async function BlogPostPage({ params }) {
  const post = await getBlogPostBySlugWithMetadata(params.slug)
  
  if (!post) {
    return <div>Post not found</div>
  }
  
  const htmlContent = await marked(post.content)
  
  return (
    <>
      <BlogPostSchema post={post} baseUrl="https://yourdomain.com" />
      
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
    </>
  )
}
```

### Opción 3: Con Metadata de Next.js

```typescript
// app/blog/[slug]/page.tsx
import { getBlogPostBySlugWithMetadata } from '@/lib/queries/blog'
import { BlogPostSchema } from '@/components/Blog/BlogPostSchema'

export async function generateMetadata({ params }) {
  const post = await getBlogPostBySlugWithMetadata(params.slug)
  
  if (!post) {
    return { title: 'Post not found' }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      image: post.coverImage,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author]
    }
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPostBySlugWithMetadata(params.slug)
  
  if (!post) {
    return <div>Post not found</div>
  }
  
  return (
    <>
      <BlogPostSchema post={post} baseUrl="https://yourdomain.com" />
      {/* Contenido del post */}
    </>
  )
}
```

---

## 📊 Schema Generado

Cuando visitas `/blog/mi-post`, se genera automáticamente:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "5 Tips for Buying Your First Home",
  "description": "A comprehensive guide to buying your first home...",
  "image": "https://yourdomain.com/images/post.jpg",
  "datePublished": "2024-02-14T10:00:00.000Z",
  "dateModified": "2024-02-14T10:00:00.000Z",
  "author": {
    "@type": "Person",
    "name": "John Doe"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Real Estate Company",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yourdomain.com/images/header/logo1.png"
    }
  },
  "articleBody": "Full article content...",
  "wordCount": 1500,
  "url": "https://yourdomain.com/blog/5-tips-buying-home",
  "keywords": "real estate, property, buying"
}
```

---

## ✅ Verificación

### 1. En JSON-LD Playground
```
1. Ir a: https://json-ld.org/playground/
2. Copiar schema JSON de la página
3. Verificar que es válido
```

### 2. En Google Rich Results Test
```
1. Ir a: https://search.google.com/test/rich-results
2. Pegar URL: https://yourdomain.com/blog/mi-post
3. Verificar que Google detecta el schema
```

### 3. En Google Search Console
```
1. Ir a: Google Search Console
2. Seleccionar propiedad
3. Ir a: Mejoras → Rich Results
4. Verificar que aparecen tus posts
```

---

## 🎯 Campos Dinámicos

| Campo | Fuente | Descripción |
|-------|--------|-------------|
| `headline` | `post.title` | Título del post |
| `description` | `post.excerpt` | Descripción corta |
| `image` | `post.coverImage` | Imagen de portada |
| `datePublished` | `post.publishedAt` | Fecha de publicación |
| `dateModified` | `post.createdAt` | Fecha de última modificación |
| `author.name` | `post.author` | Nombre del autor |
| `articleBody` | `post.content` | Contenido completo |
| `wordCount` | Calculado | Número de palabras |
| `url` | `post.slug` | URL del post |

---

## 🚀 Beneficios

- ✅ **Rich Results**: Snippets mejorados en búsqueda
- ✅ **Better CTR**: +20-40% click-through rate
- ✅ **Better Ranking**: Mejor posicionamiento
- ✅ **Better Indexing**: Google entiende mejor el contenido
- ✅ **Google News**: Posible aparición en Google News

---

## 📝 Ejemplo Completo

```typescript
// app/blog/[slug]/page.tsx
'use client'

import { getBlogPostBySlugWithMetadata } from '@/lib/queries/blog'
import { BlogPostSchema } from '@/components/Blog/BlogPostSchema'
import { marked } from 'marked'
import Image from 'next/image'

export async function generateMetadata({ params }) {
  const post = await getBlogPostBySlugWithMetadata(params.slug)
  return {
    title: post?.title,
    description: post?.excerpt
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPostBySlugWithMetadata(params.slug)
  
  if (!post) {
    return <div className="text-center py-20">Post not found</div>
  }
  
  const htmlContent = await marked(post.content)
  
  return (
    <>
      <BlogPostSchema post={post} baseUrl="https://yourdomain.com" />
      
      <article className="max-w-4xl mx-auto py-12 px-4">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{post.excerpt}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
            <span>•</span>
            <span>{post.wordCount} words</span>
          </div>
        </header>
        
        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-12">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
        
        {/* Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </>
  )
}
```

---

## 🔗 Archivos Relacionados

- `src/lib/queries/blog.ts` - Queries para obtener posts
- `src/components/Blog/BlogPostSchema.tsx` - Componente de schema
- `src/lib/queries/schema.ts` - Queries para schemas
- `src/components/SchemaMarkup.tsx` - Componente base
- `SCHEMA_MARKUP_SETUP.sql` - Templates de schemas

---

## 💡 Tips

### 1. Personalizar Base URL
```typescript
<BlogPostSchema 
  post={post} 
  baseUrl="https://tudominio.com"
/>
```

### 2. Agregar Más Metadatos
```typescript
// En BlogPostSchema.tsx
const enrichedSchema = {
  ...baseSchema.schemaData,
  // ... campos existentes
  articleSection: 'Real Estate Tips',
  keywords: 'real estate, buying, investing',
  timeRequired: 'PT10M' // 10 minutos
}
```

### 3. Múltiples Autores
```typescript
author: [
  { '@type': 'Person', 'name': 'Author 1' },
  { '@type': 'Person', 'name': 'Author 2' }
]
```

---

**Listo para integrar Schema Markup en tus posts de blog.**
