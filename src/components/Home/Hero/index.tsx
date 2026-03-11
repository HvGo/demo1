import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'

import { getSiteSectionByKey } from '@/lib/queries/content'
import { getSchemaMarkupByKey } from '@/lib/queries/schema'
import { SchemaMarkup } from '@/components/SchemaMarkup'
import SearchBar from './SearchBar'

const Hero = async () => {
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
  const whatsAppNumber = contactConfig.whatsAppNumber || '+1-801-707-0787'
  const phoneDigits = (whatsAppNumber || '').replace(/\D/g, '')
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
<section className='!py-0'>
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

<div className='container max-w-8xl mx-auto px-4 flex flex-col min-h-screen md:min-h-[90vh] pt-20 md:pt-32 pb-0 md:pb-32'> {/* Mobile: pb-8, Desktop: pb-32 */}
  
  <div className='relative text-white text-center z-10 mt-auto w-full'> {/* Solo mt-auto aquí */}
    <p className="text-white text-lg leading-relaxed max-w-3xl mx-auto">{subtitle}</p>
    <h1 className='text-inherit text-4xl sm:text-5xl font-semibold -tracking-wider mx-auto mt-2 md:mt-4 mb-4 md:mb-6'>
      {title}
    </h1>
    
    {bottomText && (
      <div className='mb-4 md:mb-6 max-w-4xl mx-auto'>
        <p className="bg-black/3 backdrop-blur-sm p-6 rounded-xl text-white text-shadow">
          {bottomText}
        </p>
      </div>
    )}

    {/* Botones sin cambios */}
    {(primaryHref && primaryLabel) || (secondaryHref && secondaryLabel) ? (
      <div className='flex flex-col xs:flex-row justify-center gap-4'>
        {/* ... botones iguales ... */}
        {primaryLabel && (
			  <Link href={whatsappHref} target="_blank" rel="noreferrer" className='px-8 py-4 rounded-full text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 bg-teal-500 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-teal-600 transition-colors'>
				<Icon icon="mdi:whatsapp" className="text-xl" />
				{primaryLabel}
			  </Link>
			)}
			{secondaryHref && secondaryLabel && (
			  <Link href={secondaryHref} className='px-8 py-4 rounded-full text-base font-semibold hover:cursor-pointer text-center flex items-center justify-center gap-2 bg-primary text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-primary/90 transition-colors'>
				<Icon icon="mdi:email" className="text-xl" />
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
