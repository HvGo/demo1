'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function normalizePhoneNumber(phone: string): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `1${digits}`
  }
  return digits
}

export const FloatingBubbles = () => {
  const [whatsappHref, setWhatsappHref] = useState<string>('https://wa.me/1234567890')

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('/api/contact-info')
        const data = await response.json()
        
        if (data.phone) {
          const phoneDigits = normalizePhoneNumber(data.phone)
          const whatsappMessage = encodeURIComponent('Hola, quisiera más información')
          setWhatsappHref(`https://wa.me/${phoneDigits}?text=${whatsappMessage}`)
        }
      } catch (error) {
        console.error('Error fetching contact info:', error)
      }
    }

    fetchContactInfo()
  }, [])

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
