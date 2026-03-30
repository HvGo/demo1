'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { GoldenQuestionsModal } from '@/components/Buyers/GoldenQuestionsModal'
import { CuratedSearchModal } from '@/components/Buyers/CuratedSearchModal'

function isSafari(): boolean {
  if (typeof window === 'undefined') return false
  const ua = navigator.userAgent.toLowerCase()
  return /safari/.test(ua) && !/chrome/.test(ua) && !/firefox/.test(ua)
}

export default function BuyingStrategyHero() {
  const [isSafariBrowser, setIsSafariB] = useState(false)
  const [isGoldenQuestionsModalOpen, setIsGoldenQuestionsModalOpen] = useState(false)
  const [isCuratedSearchModalOpen, setIsCuratedSearchModalOpen] = useState(false)

  useEffect(() => {
    setIsSafariB(isSafari())
  }, [])

  return (
    <section className='!py-0'>
      <div className='overflow-hidden relative'>
        <div className='absolute inset-0 -z-[1]'>
          {isSafariBrowser ? (
            <Image
              src='/images/Gallery/IMG_7535.jpg'
              alt='Buying Strategy Hero'
              fill
              priority={true}
              unoptimized={true}
              className='object-cover object-center'
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster='/images/Gallery/IMG_7535.jpg'
              className='w-full h-full object-cover'
            >
              <source src='/images/Gallery/output.webm' type='video/webm' />
              Tu navegador no soporta video.
            </video>
          )}
          <div className='absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-white/5 dark:to-black/25' />
        </div>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-12 md:pt-[28rem] pb-16 md:pb-40 flex flex-col'>
          <div className='relative text-white dark:text-white text-center md:text-center z-10'>
            <p className='text-inherit text-xm font-medium'>The Strategy: Maximum Help, Minimum Cash</p>
            <h1 className='text-inherit text-4xl sm:text-5xl font-semibold -tracking-wider mx-auto mt-2 md:mt-4 mb-4 md:mb-6'>
              Down Payment Assistance | Ayudas para el Enganche
            </h1>
            <div className='mb-4 md:mb-6 max-w-4xl mx-auto'>
            </div>
            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-4'>
              <button onClick={() => setIsGoldenQuestionsModalOpen(true)} className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 bg-teal-500 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-teal-600 transition-colors whitespace-nowrap'>
                <Icon icon='mdi:home' className='text-lg sm:text-xl flex-shrink-0' />
                <span className='hidden sm:inline'>Down payment Assistance</span>
                <span className='sm:hidden'>Down Payment</span>
              </button>
              <button onClick={() => setIsCuratedSearchModalOpen(true)} className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer text-center flex items-center justify-center gap-2 bg-primary text-white shadow-lg shadow-black/25 ring-1 ring-white/10 hover:bg-primary/90 transition-colors whitespace-nowrap'>
                <Icon icon='mdi:magnify' className='text-lg sm:text-xl flex-shrink-0' />
                <span className='hidden sm:inline'>Start My Home Search</span>
                <span className='sm:hidden'>Home Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <GoldenQuestionsModal isOpen={isGoldenQuestionsModalOpen} onClose={() => setIsGoldenQuestionsModalOpen(false)} />
      <CuratedSearchModal isOpen={isCuratedSearchModalOpen} onClose={() => setIsCuratedSearchModalOpen(false)} />
    </section>
  )
}
