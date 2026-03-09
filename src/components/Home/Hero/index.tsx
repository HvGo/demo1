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
        <div className='absolute inset-0 -z-[1]'>
          <Image
            src={imageUrl}
            alt='heroImg'
            fill
            priority={false}
            unoptimized={true}
            className='object-cover object-center'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-white/5 dark:to-black/25' />
        </div>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-8 md:pt-56 pb-4 md:pb-12'>
          <div className='relative text-white dark:text-white text-center md:text-center z-10'>
            <p className='text-inherit text-xm font-medium'>{subtitle}</p>
            <div className='my-3 md:my-6 flex justify-center'>
              <Image
                src='/images/hero/pic_ws.png'
                alt='Ivan Profile'
                width={280}
                height={280}
                className='rounded-lg'
                unoptimized={true}
              />
            </div>
            <h1 className='text-inherit text-4xl sm:text-5xl font-semibold -tracking-wider mx-auto mt-2 md:mt-4 mb-4 md:mb-6'>
              {title}
            </h1>
            {(primaryHref && primaryLabel) || (secondaryHref && secondaryLabel) ? (
              <div className='flex flex-col xs:flex-row justify-center md:justify-center gap-4 mb-8'>
                {primaryLabel ? (
                  <Link href={whatsappHref} target="_blank" rel="noreferrer" className='px-8 py-4 rounded-full text-base font-semibold hover:cursor-pointer flex items-center gap-2 bg-teal-500 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-teal-600 transition-colors'>
                    <Icon icon="mdi:whatsapp" className="text-xl" />
                    {primaryLabel}
                  </Link>
                ) : null}
                {secondaryHref && secondaryLabel ? (
                  <Link href={secondaryHref} className='px-8 py-4 rounded-full text-base font-semibold hover:cursor-pointer text-center flex items-center gap-2 bg-primary text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-primary/90 transition-colors'>
                    <Icon icon="mdi:email" className="text-xl" />
                    {secondaryLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}
            {tagline ? (
              <div className='mb-4 md:mb-10 sm:md:mb-12 max-w-2xl md:max-w-45p'>
                <p className='inline-block max-w-xl bg-black/30 backdrop-blur-md border border-white/15 rounded-lg px-4 py-2 text-white/90 text-base sm:text-lg md:text-xl leading-snug font-medium italic tracking-wide shadow-sm shadow-black/30 border-l-4 border-l-primary/90'>
                  {tagline}
                </p>
              </div>
            ) : null}
            <div className='w-full md:max-w-2xl mb-4 md:mb-8 mx-auto'>
              <SearchBar tabs={searchTabs} placeholder={searchPlaceholder} buttonLabel={searchButtonLabel} />
            </div>
          </div>
        </div>
        <div className='w-full md:absolute bottom-0 left-0 right-0 bg-white/55 dark:bg-black/40 backdrop-blur-md border border-white/35 dark:border-white/10 shadow-lg py-4 px-8 mobile:px-16 md:pl-16 md:pr-8 rounded-2xl md:rounded-none md:rounded-tl-2xl mt-6 md:mt-24'>
          {bottomText ? (
            <div className='flex items-center gap-5'>
              {profileImageUrl ? (
                <div className='shrink-0'>
                  <Image
                    src={profileImageUrl}
                    alt='profile'
                    width={80}
                    height={80}
                    className='rounded-full object-cover w-18 h-18 border border-white/40 dark:border-white/15'
                    unoptimized={true}
                  />
                </div>
              ) : null}
              <p className='text-base sm:text-lg md:text-xl font-normal leading-relaxed text-black dark:text-white whitespace-pre-line'>
                {bottomText}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Hero
