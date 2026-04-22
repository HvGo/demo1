import { getSiteSectionByKey } from '@/lib/queries/content'
import { IvanUtahClient } from './ClientComponents'

export default async function RealtorLatinoUtahBuyerPage() {
  // Get contact info from DB (same as FloatingBubbles)
  const contactSection = await getSiteSectionByKey('contact_page')
  const contactConfig = contactSection?.contentData || {}
  const whatsAppNumber = contactConfig.phone || '+1-801-707-0787'

  return (
    <IvanUtahClient 
      whatsAppNumber={whatsAppNumber}
    />
  )
}
