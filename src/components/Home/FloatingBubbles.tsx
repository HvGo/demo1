import { Icon } from '@iconify/react'
import Link from 'next/link'

export const FloatingBubbles = () => {
  return (
    <div className='fixed bottom-6 right-6 z-40 flex flex-col gap-4'>
      {/* WhatsApp Bubble */}
      <a
        href='https://wa.me/1234567890'
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300'
        title='Chat on WhatsApp'
      >
        <Icon icon='mdi:whatsapp' width={28} height={28} />
      </a>

      {/* Buyers Bubble */}
      <Link
        href='/buyers'
        className='flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300'
        title='Go to Buyers'
      >
        <Icon icon='mdi:home-search' width={28} height={28} />
      </Link>

      {/* Sellers Bubble */}
      <Link
        href='/sellers'
        className='flex items-center justify-center w-14 h-14 rounded-full bg-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300'
        title='Go to Sellers'
      >
        <Icon icon='mdi:home-city' width={28} height={28} />
      </Link>
    </div>
  )
}
