'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'

export const ReportsOpenHouses = () => {
  const [selectedRepairs, setSelectedRepairs] = useState('')
  const [selectedMarketingTool, setSelectedMarketingTool] = useState('')
  const [selectedConcern, setSelectedConcern] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const repairsOptions = [
    {
      id: 'yes-perfect',
      label: 'Yes, I want the "Perfect First Impression."',
      icon: 'mdi:sparkles'
    },
    {
      id: 'maybe-show',
      label: 'Maybe, show me how it impacts my price.',
      icon: 'mdi:chart-line'
    },
    {
      id: 'no-ready',
      label: 'No, my home is ready to go.',
      icon: 'mdi:check-circle'
    }
  ]

  const marketingTools = [
    {
      id: 'drone-tours',
      label: 'Cinematic Drone & 3D Virtual Tours.',
      icon: 'mdi:drone'
    },
    {
      id: 'social-media',
      label: 'Social Media Blitz (IG, TikTok, FB, YouTube).',
      icon: 'mdi:share-social'
    },
    {
      id: 'market-reports',
      label: 'Weekly Market Reports & Open Houses.',
      icon: 'mdi:file-document'
    }
  ]

  const concerns = [
    {
      id: 'interest-rates',
      label: 'Interest rates and competition. (Intereses y competencia).',
      icon: 'mdi:percent'
    },
    {
      id: 'time-to-sell',
      label: 'The time it will take to sell. (El tiempo que tomará vender).',
      icon: 'mdi:clock'
    },
    {
      id: 'negotiation',
      label: 'Negotiating the best terms. (Negociar los mejores términos).',
      icon: 'mdi:handshake'
    }
  ]

  return (
    <section id='reports-open-houses' className='py-16 md:py-24 bg-white dark:bg-dark'>
      <div className='container max-w-6xl mx-auto px-5 2xl:px-0'>
        {/* Header */}
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-black dark:text-white mb-4'>
            Ver Mi Plan de Marketing
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            We control the Price, the Condition, and the Marketing. Aquí es donde hacemos que su casa destaque sobre la competencia
          </p>
        </div>

        {/* Question 1: Professional Help with Repairs */}
        <div className='bg-gradient-to-br from-primary/5 to-teal-500/5 rounded-lg p-8 md:p-12 border border-primary/20 mb-12'>
          <h3 className='text-2xl font-bold text-black dark:text-white mb-8'>
            1. Would you like professional help with repairs or cleaning before listing?
          </h3>
          <p className='text-lg text-gray-700 dark:text-gray-300 mb-6 font-semibold'>
            ¿Le interesa ayuda profesional con reparaciones o limpieza antes de vender?
          </p>

          <div className='space-y-3'>
            {repairsOptions.map(option => (
              <label
                key={option.id}
                className='flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 cursor-pointer transition-colors'
              >
                <input
                  type='radio'
                  name='repairs'
                  value={option.id}
                  checked={selectedRepairs === option.id}
                  onChange={(e) => setSelectedRepairs(e.target.value)}
                  className='w-5 h-5 text-primary'
                />
                <Icon icon={option.icon} className='text-xl text-primary flex-shrink-0' />
                <span className='text-gray-700 dark:text-gray-300'>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 2: Marketing Tool Preference */}
        <div className='bg-gradient-to-br from-primary/5 to-teal-500/5 rounded-lg p-8 md:p-12 border border-primary/20 mb-12'>
          <h3 className='text-2xl font-bold text-black dark:text-white mb-8'>
            2. Which marketing tool is most important to you?
          </h3>
          <p className='text-lg text-gray-700 dark:text-gray-300 mb-6 font-semibold'>
            ¿Qué herramienta de mercadeo es más importante para usted?
          </p>

          <div className='space-y-3'>
            {marketingTools.map(tool => (
              <label
                key={tool.id}
                className='flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 cursor-pointer transition-colors'
              >
                <input
                  type='radio'
                  name='marketingTool'
                  value={tool.id}
                  checked={selectedMarketingTool === tool.id}
                  onChange={(e) => setSelectedMarketingTool(e.target.value)}
                  className='w-5 h-5 text-primary'
                />
                <Icon icon={tool.icon} className='text-xl text-primary flex-shrink-0' />
                <span className='text-gray-700 dark:text-gray-300'>{tool.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 3: Biggest Concern */}
        <div className='bg-gradient-to-br from-primary/5 to-teal-500/5 rounded-lg p-8 md:p-12 border border-primary/20 mb-12'>
          <h3 className='text-2xl font-bold text-black dark:text-white mb-8'>
            3. What is your biggest concern about the current market?
          </h3>
          <p className='text-lg text-gray-700 dark:text-gray-300 mb-6 font-semibold'>
            ¿Cuál es su mayor preocupación en el mercado actual?
          </p>

          <div className='space-y-3'>
            {concerns.map(concern => (
              <label
                key={concern.id}
                className='flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 cursor-pointer transition-colors'
              >
                <input
                  type='radio'
                  name='concern'
                  value={concern.id}
                  checked={selectedConcern === concern.id}
                  onChange={(e) => setSelectedConcern(e.target.value)}
                  className='w-5 h-5 text-primary'
                />
                <Icon icon={concern.icon} className='text-xl text-primary flex-shrink-0' />
                <span className='text-gray-700 dark:text-gray-300'>{concern.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 4: High-Impact Plan */}
        <div className='bg-gradient-to-r from-primary/10 to-teal-500/10 dark:from-primary/5 dark:to-teal-500/5 rounded-lg p-8 md:p-12 border border-primary/20'>
          <h3 className='text-2xl font-bold text-black dark:text-white mb-4'>
            4. Ready to see the full &quot;High-Impact&quot; Plan?
          </h3>
          <p className='text-lg text-gray-700 dark:text-gray-300 mb-8 font-semibold'>
            ¿Listo para ver el plan completo de mercadeo?
          </p>

          <form className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div>
                <label className='block text-sm font-semibold text-black dark:text-white mb-2'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your full name'
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
              <div>
                <label className='block text-sm font-semibold text-black dark:text-white mb-2'>
                  WhatsApp Number
                </label>
                <input
                  type='tel'
                  name='whatsapp'
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder='Your WhatsApp number'
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>
            </div>

            <button
              type='button'
              className='w-full bg-gradient-to-r from-primary to-teal-500 text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2'
            >
              <Icon icon='mdi:file-document-multiple' width={20} height={20} />
              Ver Plan Completo
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
