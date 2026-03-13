'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'

export const CuratedSearchSection = () => {
  const [selectedReality, setSelectedReality] = useState('')
  const [selectedCounty, setSelectedCounty] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const realityOptions = [
    {
      id: 'first-time',
      title: 'The First-Time Legacy',
      description: 'Focus on homes qualifying for Utah Housing (DPA) or First-Time Buyer Grants.',
      icon: 'mdi:home-heart'
    },
    {
      id: 'modern',
      title: 'The Modern Advantage',
      description: 'Focus on New Construction with massive Builder Incentives and rate buy-downs.',
      icon: 'mdi:home-modern'
    },
    {
      id: 'wealth',
      title: 'The Wealth Builder',
      description: 'Focus on homes with Mother-in-Law apartments or high appreciation potential.',
      icon: 'mdi:chart-line'
    }
  ]

  const countyOptions = [
    { id: 'salt-lake', label: 'Salt Lake County (West Jordan, Herriman, West Valley)' },
    { id: 'utah', label: 'Utah County (Lehi, Saratoga Springs, Eagle Mountain)' },
    { id: 'other', label: 'Tooele, Davis, or Weber County' }
  ]

  return (
    <section id='curated-search' className='py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-dark/80'>
      <div className='container max-w-6xl mx-auto px-5 2xl:px-0'>
        {/* Header */}
        <div className='text-center mb-12 md:mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-black dark:text-white mb-4'>
            Welcome Home. Let&apos;s Find Your Home.
          </h1>
          <h2 className='text-xl md:text-2xl font-semibold text-primary mb-6'>
            Tu búsqueda, tu legado: Busquemos propiedades que construyan riqueza.
          </h2>
        </div>

        {/* Section 1: The Curated Search Strategy */}
        <div className='mb-12 md:mb-16 bg-white dark:bg-dark/50 rounded-lg p-8 border border-gray-200 dark:border-gray-700'>
          <h3 className='text-2xl md:text-3xl font-bold text-black dark:text-white mb-4'>
            The Curated Search Strategy
          </h3>
          <p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
            <span className='font-semibold text-primary'>&quot;Don&apos;t just look for a house. Look for an opportunity.&quot;</span> To find the right home in Utah&apos;s market, we look beyond the price tag. We identify properties that qualify for Down Payment Assistance and offer the best potential for Long-Term Equity.
          </p>
        </div>

        {/* Section 2: Define Your Opportunity */}
        <div className='mb-12 md:mb-16'>
          <h3 className='text-2xl md:text-3xl font-bold text-black dark:text-white mb-8'>
            Define Your Opportunity
          </h3>

          {/* Question 1: Reality Type */}
          <div className='mb-10'>
            <h4 className='text-lg font-semibold text-black dark:text-white mb-6'>
              1. What type of &quot;Reality&quot; are we building?
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {realityOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setSelectedReality(option.id)}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    selectedReality === option.id
                      ? 'border-primary bg-primary/5 dark:bg-primary/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                  }`}
                >
                  <div className='flex items-start gap-3 mb-3'>
                    <Icon icon={option.icon} className='text-2xl text-primary flex-shrink-0 mt-1' />
                    <h5 className='font-semibold text-black dark:text-white'>{option.title}</h5>
                  </div>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: County Selection */}
          <div>
            <h4 className='text-lg font-semibold text-black dark:text-white mb-6'>
              2. Where should your legacy begin?
            </h4>
            <div className='space-y-3'>
              {countyOptions.map(option => (
                <label key={option.id} className='flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 cursor-pointer transition-colors'>
                  <input
                    type='radio'
                    name='county'
                    value={option.id}
                    checked={selectedCounty === option.id}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                    className='w-5 h-5 text-primary'
                  />
                  <span className='text-gray-700 dark:text-gray-300'>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Unlock Your Personalized List */}
        <div className='bg-gradient-to-r from-primary/10 to-teal-500/10 dark:from-primary/5 dark:to-teal-500/5 rounded-lg p-8 md:p-12 border border-primary/20'>
          <h3 className='text-2xl md:text-3xl font-bold text-black dark:text-white mb-4'>
            Unlock Your Personalized List
          </h3>
          <p className='text-lg text-gray-700 dark:text-gray-300 mb-8'>
            <span className='font-semibold'>&quot;Ser dueño de casa ya no es un sueño, es una realidad.&quot;</span> Enter your details to receive a curated list of homes that fit your family&apos;s budget and maximize your financial assistance options.
          </p>

          <form className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div>
                <label className='block text-sm font-semibold text-black dark:text-white mb-2'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder='Your full name'
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-black dark:text-white mb-2'>
                  Phone (WhatsApp Preferred)
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Your phone number'
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-black dark:text-white mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Your email'
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>
            </div>

            <button
              type='button'
              className='w-full bg-gradient-to-r from-primary to-teal-500 text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2'
            >
              <Icon icon='mdi:home-search' width={20} height={20} />
              VER PROPIEDADES AHORA
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
