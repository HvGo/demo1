import Image from 'next/image'

export const Hero = () => {
  return (
    <section className='!py-0'>
      <div className='overflow-hidden relative'>
        <div className='absolute inset-0 -z-[1]'>
          <Image
            src='/images/hero/heroBanner.png'
            alt='About Us Hero'
            fill
            priority={true}
            unoptimized={true}
            className='object-cover object-center'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-white/5 dark:to-black/25' />
        </div>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-12 md:pt-[28rem] pb-16 md:pb-40 flex flex-col'>
          <div className='relative text-white dark:text-white text-center md:text-center z-10'>
            <p className='text-inherit text-xm font-medium'>Conoce Nuestro Equipo</p>
            <h1 className='text-inherit text-4xl sm:text-5xl font-semibold -tracking-wider mx-auto mt-2 md:mt-4 mb-4 md:mb-6'>
              About Blue Key Realty
            </h1>
            <div className='mb-4 md:mb-6 max-w-4xl mx-auto'>
              <p className='text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/90 whitespace-pre-line'>
                Education is the bridge between a dream and a deed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
