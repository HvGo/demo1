import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from "next";
import ContactForm from '@/components/ContactForm'
import { getSiteSectionByKey } from '@/lib/queries/content'

export const metadata: Metadata = {
    title: "Contact Us | Homely",
};

export default async function ContactUs() {
  const contactSection = await getSiteSectionByKey('contact_page')
  const data = contactSection?.contentData || {}
  
  const title = data.title || "Have questions? ready to help!"
  const description = data.description || "Looking for your dream home or ready to sell? Our expert team offers personalized guidance and market expertise tailored to you."
  const contactTitle = data.contactTitle || "Contact information"
  const contactDescription = data.contactDescription || "Ready to find your dream home or sell your property? We're here to help!"
  const phone = data.phone || "+1 0239 0310 1122"
  const email = data.email || "support@gleamer.com"
  const address = data.address || "Blane Street, Manchester"
  const image = data.image || '/images/contactUs/contactUs.jpg'
  return (
    <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28'>
      <div className='mb-16'>
        <div className='flex gap-2.5 items-center justify-center mb-3'>
          <span>
            <Icon
              icon={'ph:house-simple-fill'}
              width={20}
              height={20}
              className='text-primary'
            />
          </span>
          <p className='text-base font-semibold text-badge dark:text-white/90'>
            Contact us
          </p>
        </div>
        <div className='text-center'>
          <h3 className='text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-3 leading-10 sm:leading-14'>
            {title}
          </h3>
          <p className='text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6'>
            {description}
          </p>
        </div>
      </div>
      {/* form */}
      <div className='border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xl dark:shadow-white/10'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-12'>
          <div className='relative w-fit'>
            <Image
              src={image}
              alt='contact'
              width={497}
              height={535}
              className='rounded-2xl brightness-50 h-full'
              unoptimized={true}
            />
            <div className='absolute top-6 left-6 lg:top-12 lg:left-12 flex flex-col gap-2'>
              <h5 className='text-xl xs:text-2xl mobile:text-3xl font-medium tracking-tight text-white'>
                {contactTitle}
              </h5>
              <p className='text-sm xs:text-base mobile:text-xm font-normal text-white/80'>
                {contactDescription}
              </p>
            </div>
            <div className='absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex flex-col gap-4 text-white'>
              <Link href={`tel:${phone}`} className='w-fit'>
                <div className='flex items-center gap-4 group w-fit'>
                  <Icon icon={'ph:phone'} width={32} height={32} />
                  <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>
                    {phone}
                  </p>
                </div>
              </Link>
              <Link href={`mailto:${email}`} className='w-fit'>
                <div className='flex items-center gap-4 group w-fit'>
                  <Icon icon={'ph:envelope-simple'} width={32} height={32} />
                  <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>
                    {email}
                  </p>
                </div>
              </Link>
              <div className='flex items-center gap-4'>
                <Icon icon={'ph:map-pin'} width={32} height={32} />
                <p className='text-sm xs:text-base mobile:text-xm font-normal'>
                  {address}
                </p>
              </div>
            </div>
          </div>
          <div className='flex-1/2'>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
