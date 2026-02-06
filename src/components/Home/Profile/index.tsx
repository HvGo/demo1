import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@iconify/react/dist/iconify.js'

import { getSiteSectionByKey } from '@/lib/queries/content'

const Profile = async () => {
  const section = await getSiteSectionByKey('home_profile')

  if (section && section.isVisible === false) return null

  const eyebrow = section?.title || 'Meet your agent'
  const heading = section?.subtitle || 'The Vision: Building legacies through real estate'
  const body =
    section?.description ||
    "From helping first-time buyers to guiding investors, I bring bilingual expertise, clear strategy, and confidence to win in today's market."

  const imageUrl = section?.imageUrl || '/images/faqs/faq-image.png'

  const ctaLabel = section?.primaryCtaLabel || ''
  const ctaHref = section?.primaryCtaHref || ''

  return (
    <section>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='grid lg:grid-cols-2 gap-10 items-center'>
          <div className='relative'>
            <Image
              src={imageUrl}
              alt='profile'
              width={680}
              height={760}
              className='rounded-2xl w-full h-auto object-cover'
              unoptimized={true}
            />
          </div>

          <div className='flex flex-col gap-6 lg:px-8'>
            <p className='text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 tracking-[0.18em] uppercase'>
              <Icon icon='ph:house-simple-fill' className='text-2xl text-primary' />
              {eyebrow}
            </p>

            <h2 className='lg:text-52 text-40 font-medium leading-[1.15] text-dark dark:text-white'>
              {heading}
            </h2>

            <div className='text-dark/50 dark:text-white/50 text-lg leading-[1.65] whitespace-pre-line'>
              {body}
            </div>

            {ctaHref && ctaLabel ? (
              <div>
                <Link
                  href={ctaHref}
                  className='py-4 px-8 bg-primary text-base leading-4 block w-fit text-white rounded-full font-semibold hover:bg-dark duration-300'
                >
                  {ctaLabel}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
