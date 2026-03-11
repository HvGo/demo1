import Image from 'next/image'

export const Hero = () => {
  return (
    <section className='!py-0'>
      <div className='overflow-hidden relative'>
        <div className='absolute inset-0 -z-[1]'>
          <Image
            src='/images/hero/heroBanner.png'
            alt='Buyers Hero'
            fill
            priority={true}
            unoptimized={true}
            className='object-cover object-center'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-white/5 dark:to-black/25' />
        </div>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-12 md:pt-[28rem] pb-16 md:pb-40 flex flex-col'>
          <div className='relative text-white dark:text-white text-center md:text-center z-10'>
            <p className='text-inherit text-xm font-medium'>First-Time Home Buyer</p>
            <h1 className='text-inherit text-4xl sm:text-5xl font-semibold -tracking-wider mx-auto mt-2 md:mt-4 mb-4 md:mb-6'>
              Your Path to Homeownership
            </h1>
            <div className='mb-4 md:mb-6 max-w-4xl mx-auto'>
              <p className='text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/90 whitespace-pre-line'>
                Ser dueño de casa ya no es un sueño, es una realidad
              </p>
            </div>
            <div className='flex flex-col xs:flex-row justify-center md:justify-center gap-4 mb-8'>
              <a href='#golden-questions' className='px-8 py-4 rounded-full text-base font-semibold hover:cursor-pointer flex items-center gap-2 bg-teal-500 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-teal-600 transition-colors'>
                Start Your Journey
              </a>
              <a href='#process' className='px-8 py-4 rounded-full text-base font-semibold hover:cursor-pointer text-center flex items-center gap-2 bg-primary text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-primary/90 transition-colors'>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
