import { getAllSiteSections, getFaqs } from '@/lib/queries/content'
import { getSectionComponent, isValidSectionKey } from '@/lib/sectionComponents'
import { getSchemaMarkupByKey } from '@/lib/queries/schema'
import { SchemaMarkup } from '@/components/SchemaMarkup'

export const revalidate = 600

export default async function Home() {
  const allSections = await getAllSiteSections()
  const organizationSchema = await getSchemaMarkupByKey('organization')
  const breadcrumbSchema = await getSchemaMarkupByKey('breadcrumb_list')
  const faqSchema = await getSchemaMarkupByKey('faq_page')
  const faqs = await getFaqs('home')

  // Enriquecer FAQPage schema con FAQs reales
  const enrichedFaqSchema = faqSchema && faqs.length > 0 ? {
    ...faqSchema.schemaData,
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  } : faqSchema?.schemaData

  return (
    <main>
      <SchemaMarkup schema={organizationSchema?.schemaData} />
      <SchemaMarkup schema={breadcrumbSchema?.schemaData} />
      <SchemaMarkup schema={enrichedFaqSchema} />
      
      {allSections
        .filter((section) => section.isVisible)
        .map((section) => {
          if (!isValidSectionKey(section.key)) {
            console.warn(`Section key not found: ${section.key}`)
            return null
          }

          const Component = getSectionComponent(section.key)
          if (!Component) return null

          return <Component key={section.key} />
        })}
    </main>
  )
}
