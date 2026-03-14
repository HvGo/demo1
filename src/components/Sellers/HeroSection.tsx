import { getSiteSectionByKey } from '@/lib/queries/content'
import HeroSectionClient from './HeroSectionClient'

function normalizePhoneNumber(phone: string): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `1${digits}`
  }
  return digits
}

export const HeroSection = async () => {
  const contactSection = await getSiteSectionByKey('contact_page')
  const contactConfig = contactSection?.contentData || {}
  const whatsAppNumber = contactConfig.phone || '+1-801-707-0787'
  const phoneDigits = normalizePhoneNumber(whatsAppNumber)
  const whatsappMessage = encodeURIComponent('Hola, quisiera más información')
  const whatsappHref = phoneDigits ? `https://wa.me/${phoneDigits}?text=${whatsappMessage}` : 'https://wa.me'

  return (
    <HeroSectionClient whatsappHref={whatsappHref} />
  )
}
