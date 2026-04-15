import { getSiteSectionByKey } from '@/lib/queries/content'
import { IvanUtahClient } from './ClientComponents'

function normalizePhoneNumber(phone: string): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `1${digits}`
  }
  return digits
}

export default async function IvanUtahPage() {
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
