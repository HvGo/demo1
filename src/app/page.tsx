import { getAllSiteSections } from '@/lib/queries/content'
import { getSectionComponent, isValidSectionKey } from '@/lib/sectionComponents'

export const revalidate = 600

export default async function Home() {
  const allSections = await getAllSiteSections()

  return (
    <main>
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
