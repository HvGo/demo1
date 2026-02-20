import { getSchemaMarkupByKey } from '@/lib/queries/schema'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import { BlogPostWithMetadata } from '@/lib/queries/blog'

interface BlogPostSchemaProps {
  post: BlogPostWithMetadata
  baseUrl?: string
}

/**
 * Componente que genera y renderiza Schema Markup para un post de blog
 */
export async function BlogPostSchema({ post, baseUrl = 'https://yourdomain.com' }: BlogPostSchemaProps) {
  const baseSchema = await getSchemaMarkupByKey('blog_post')

  if (!baseSchema) {
    return null
  }

  // Enriquecer schema con datos del post
  const enrichedSchema = {
    ...baseSchema.schemaData,
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || `${baseUrl}/images/default-post.jpg`,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.createdAt).toISOString(),
    author: {
      '@type': 'Person',
      'name': post.author || 'Author'
    },
    publisher: {
      '@type': 'Organization',
      'name': 'Real Estate Company',
      'logo': {
        '@type': 'ImageObject',
        'url': `${baseUrl}/images/header/logo1.png`
      }
    },
    articleBody: post.content,
    wordCount: post.wordCount,
    url: `${baseUrl}/blog/${post.slug}`,
    keywords: [post.tag, 'real estate', 'property'].filter(Boolean).join(', ')
  }

  return <SchemaMarkup schema={enrichedSchema} />
}

export default BlogPostSchema
