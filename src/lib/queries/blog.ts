import { sql } from '@/lib/db'

export interface BlogPostWithMetadata {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  tag: string
  detail: string
  content: string
  author: string
  authorImage: string
  publishedAt: string
  createdAt: string
  wordCount: number
}

/**
 * Obtiene un post de blog por slug con metadatos para schema markup
 */
export async function getBlogPostBySlugWithMetadata(slug: string): Promise<BlogPostWithMetadata | null> {
  const { rows } = await sql<{
    slug: string
    title: string
    excerpt: string | null
    cover_image_url: string | null
    tag: string | null
    detail: string | null
    content_markdown: string
    author: string | null
    author_image_url: string | null
    published_at: string | null
    created_at: string
  }>(
    `
    select slug, title, excerpt, cover_image_url, tag, detail, content_markdown,
           author, author_image_url,
           coalesce(published_at::text, created_at::text) as published_at,
           created_at::text as created_at
    from blog_posts
    where slug = $1
      and is_published = true
    limit 1
    `,
    [slug]
  )

  const r = rows[0]
  if (!r) return null

  // Calcular word count del contenido markdown
  const wordCount = r.content_markdown.split(/\s+/).filter(word => word.length > 0).length

  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt || '',
    coverImage: r.cover_image_url || '',
    tag: r.tag || '',
    detail: r.detail || '',
    content: r.content_markdown,
    author: r.author || '',
    authorImage: r.author_image_url || '',
    publishedAt: r.published_at || r.created_at,
    createdAt: r.created_at,
    wordCount
  }
}

/**
 * Obtiene todos los posts publicados
 */
export async function getAllPublishedBlogPosts(limit?: number) {
  const { rows } = await sql<{
    slug: string
    title: string
    excerpt: string | null
    cover_image_url: string | null
    tag: string | null
    detail: string | null
    published_at: string | null
    created_at: string
  }>(
    `
    select slug, title, excerpt, cover_image_url, tag, detail,
           coalesce(published_at::text, created_at::text) as published_at,
           created_at::text as created_at
    from blog_posts
    where is_published = true
    order by published_at desc nulls last, created_at desc
    ${typeof limit === 'number' ? 'limit $1' : ''}
    `,
    typeof limit === 'number' ? [limit] : []
  )

  return rows.map(r => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt || '',
    coverImage: r.cover_image_url || '',
    tag: r.tag || '',
    detail: r.detail || '',
    publishedAt: r.published_at || r.created_at,
    createdAt: r.created_at
  }))
}
