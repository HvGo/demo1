import { Icon } from '@iconify/react'
import Link from 'next/link'
import { getSiteSectionByKey } from '@/lib/queries/content'

function normalizePhoneNumber(phone: string): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `1${digits}`
  }
  return digits
}

export const FloatingBubbles = async () => {
  // Get contact info from DB (same as Hero component)
  const contactSection = await getSiteSectionByKey('contact_page')
  const contactConfig = contactSection?.contentData || {}
  const whatsAppNumber = contactConfig.phone || '+1-801-707-0787'
  const phoneDigits = normalizePhoneNumber(whatsAppNumber)
  const whatsappMessage = encodeURIComponent('Hola, quisiera más información')
  const whatsappHref = phoneDigits ? `https://wa.me/${phoneDigits}?text=${whatsappMessage}` : 'https://wa.me'

  return (
    <div className='fixed bottom-6 right-6 z-40 flex flex-col gap-4'>
      {/* WhatsApp Bubble */}
      <a
        href={whatsappHref}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300'
        title='Chat on WhatsApp'
      >
        <Icon icon='mdi:whatsapp' width={28} height={28} />
      </a>
    </div>
  )
}
