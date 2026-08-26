import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'

import { getSiteSectionByKey } from '@/lib/queries/content'
import { getSchemaMarkupByKey } from '@/lib/queries/schema'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import SearchBar from './SearchBar'

function normalizePhoneNumber(phone: string): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `1${digits}`
  }
  return digits
}

const Hero = async () => {
  // Revalidate every 60 seconds to pick up image changes from DB
  const section = await getSiteSectionByKey('home_hero')
  const taglineSection = await getSiteSectionByKey('home_hero_tagline')
  const organizationSchema = await getSchemaMarkupByKey('organization')
  const contactSection = await getSiteSectionByKey('contact_page')

  const subtitle = section?.subtitle || 'Palm springs, CA'
  const title = section?.title || 'Futuristic Haven'
  const imageUrl = section?.imageUrl || '/images/hero/heroBanner.png'

  const primaryLabel = section?.primaryCtaLabel || ''
  const primaryHref = section?.primaryCtaHref || ''

  const secondaryLabel = section?.secondaryCtaLabel || ''
  const secondaryHref = section?.secondaryCtaHref || ''
  const bottomText = section?.description || ''
  const profileImageUrl = section?.profileImageUrl || ''
  const tagline = taglineSection?.description || ''

  // WhatsApp configuration from contact page
  const contactConfig = contactSection?.contentData || {}
  const whatsAppNumber = contactConfig.phone || '+1-801-707-0787'
  const phoneDigits = normalizePhoneNumber(whatsAppNumber)
  const whatsappMessage = encodeURIComponent('Hola, quisiera más información')
  const whatsappHref = phoneDigits ? `https://wa.me/${phoneDigits}?text=${whatsappMessage}` : primaryHref

  // SearchBar data from content_data
  const searchData = section?.contentData || {}
  const searchTabs = searchData.searchTabs || [
    { id: 'buy', label: 'BUY A HOME' },
    { id: 'sell', label: 'SELL A HOME' },
    { id: 'value', label: 'HOME VALUE' }
  ]
  const searchPlaceholder = searchData.searchPlaceholder || 'Search by city, county, or zip'
  const searchButtonLabel = searchData.searchButtonLabel || 'SEARCH'

  if (section && section.isVisible === false) return null

  return (
<section className='!py-0 mt-24'>
  <SchemaMarkup schema={organizationSchema?.schemaData} />
  <div className='overflow-hidden relative'>
    {/* Fondo e Imagen */}
    <div className='absolute inset-0 -z-[1]'>
      <Image
        src={imageUrl}
        alt='heroImg'
        fill
        priority={true}
        unoptimized={false}
        className='object-cover object-center'
      />
      <div className='absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-white/5 dark:to-black/25' />
    </div>

<div className='container max-w-8xl mx-auto px-4 flex flex-col min-h-screen md:min-h-[90vh] pt-90 md:pt-80 pb-0 md:pb-10'> {/* Mobile: pt-80, Desktop: pt-80 */}
  
  <div className='relative text-white text-center z-10 mt-auto w-full'> {/* Solo mt-auto aquí */}
    <p className="text-xl sm:text-2xl font-bold mx-auto pb-0 md:pb-0 uppercase text-center" style={{ fontFamily: "'Oswald', system-ui, sans-serif", color: '#FFFFFF', textShadow: '-2px -2px 0 #1a1a1a, 2px -2px 0 #1a1a1a, -2px 2px 0 #1a1a1a, 2px 2px 0 #1a1a1a, -2px 0 0 #1a1a1a, 2px 0 0 #1a1a1a, 0 -2px 0 #1a1a1a, 0 2px 0 #1a1a1a, 0 4px 8px rgba(0,0,0,0.9)' } as React.CSSProperties}>{subtitle}</p>
    <h1 className='text-4xl sm:text-5xl font-black mx-auto mt-2 md:mt-4 mb-4 md:mb-6 pb-0 md:pb-0 capitalize max-w-4xl' style={{ fontFamily: '"Noto Color Emoji"', color: '#fad057', letterSpacing: '0.02em', textShadow: '-2px -2px 0 #1a1a1a, 2px -2px 0 #1a1a1a, -2px 2px 0 #1a1a1a, 2px 2px 0 #1a1a1a, -3px 0 0 #1a1a1a, 3px 0 0 #1a1a1a, 0 -3px 0 #1a1a1a, 0 3px 0 #1a1a1a, 0 4px 8px rgba(0,0,0,0.8)', wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', fontStretch: 'normal' } as React.CSSProperties}>
      {title}
    </h1>
    
    {bottomText && (
      <div className='mb-4 md:mb-6 max-w-4xl mx-auto'>
        <p className="backdrop-blur-sm p-6 rounded-xl text-white text-shadow font-bold opacity-[10]" style={{ backgroundColor: 'unset', background: 'unset' }}>
          {bottomText}
        </p>
      </div>
    )}

    {/* CTA Buttons */}
    {(primaryHref && primaryLabel) || (secondaryHref && secondaryLabel) ? (
      <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-4'>
        {primaryLabel && (
          <Link href={whatsappHref} target="_blank" rel="noreferrer" className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 transition-colors whitespace-nowrap' style={{ backgroundColor: 'rgba(0, 168, 107, 1)' }}>
            <Icon icon="mdi:whatsapp" className="text-lg sm:text-xl flex-shrink-0" />
            {primaryLabel}
          </Link>
        )}
        {secondaryHref && secondaryLabel && (
          <Link href={secondaryHref} className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer text-center flex items-center justify-center gap-2 shadow-lg shadow-black/25 ring-1 ring-white/10 transition-colors whitespace-nowrap' style={{ backgroundColor: '#FDCB6E', color: '#067ff9' }}>
            <Icon icon="mdi:home" className="text-lg sm:text-xl flex-shrink-0" />
            {secondaryLabel}
          </Link>
        )}
      </div>
    ) : null}
  </div>
</div>

  </div>
</section>
  )
}

export default Hero
