'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { validateCuratedSearchForm, ValidationError } from '@/lib/validators'

interface CuratedSearchSectionProps {
  onSuccess?: () => void
}

export const CuratedSearchSection = ({ onSuccess }: CuratedSearchSectionProps = {}) => {
  const [selectedReality, setSelectedReality] = useState('')
  const [selectedCounty, setSelectedCounty] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [successMessage, setSuccessMessage] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(errors.filter(err => err.field !== name))
  }

  const getFieldError = (fieldName: string) => {
    return errors.find(err => err.field === fieldName)?.message
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    setSuccessMessage('')

    const validation = validateCuratedSearchForm({
      selectedReality,
      selectedCounty,
      ...formData
    })

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/forms/curated-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedReality,
          selectedCounty,
          ...formData,
          sessionId: typeof window !== 'undefined' ? localStorage.getItem('session_id') : ''
        })
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors)
        } else {
          setErrors([{ field: 'form', message: data.error || 'Error al guardar el formulario' }])
        }
        return
      }

      setSuccessMessage('¡Gracias! Nos pondremos en contacto pronto.')
      setSelectedReality('')
      setSelectedCounty('')
      setFormData({ fullName: '', phone: '', email: '' })
      setSubmitted(true)
      setShowSuccessModal(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors([{ field: 'form', message: 'Error de conexión. Por favor intenta de nuevo.' }])
    } finally {
      setLoading(false)
    }
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
             <p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
            <span className='font-semibold text-primary'>No te limites a buscar una casa. Busca una oportunidad.</span> To find the right home in Utah&apos;s market, we look beyond the price tag. We identify properties that qualify for Down Payment Assistance and offer the best potential for Long-Term Equity.
          </p>
        </div>

        {/* Section 2: Define Your Opportunity */}
        <div className='mb-12 md:mb-16'>
          <h3 className='text-center text-2xl md:text-3xl font-bold text-black dark:text-white mb-8'>
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
                  onClick={() => {
                    setSelectedReality(option.id)
                    setErrors(errors.filter(err => err.field !== 'selectedReality'))
                  }}
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
            {getFieldError('selectedReality') && (
              <p className='text-red-500 text-sm mt-3'>{getFieldError('selectedReality')}</p>
            )}
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
                    onChange={(e) => {
                      setSelectedCounty(e.target.value)
                      setErrors(errors.filter(err => err.field !== 'selectedCounty'))
                    }}
                    className='w-5 h-5 text-primary'
                  />
                  <span className='text-gray-700 dark:text-gray-300'>{option.label}</span>
                </label>
              ))}
            </div>
            {getFieldError('selectedCounty') && (
              <p className='text-red-500 text-sm mt-3'>{getFieldError('selectedCounty')}</p>
            )}
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

          <form onSubmit={handleSubmit} className='space-y-6'>
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
                {getFieldError('fullName') && (
                  <p className='text-red-500 text-sm mt-1'>{getFieldError('fullName')}</p>
                )}
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
                {getFieldError('phone') && (
                  <p className='text-red-500 text-sm mt-1'>{getFieldError('phone')}</p>
                )}
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
                {getFieldError('email') && (
                  <p className='text-red-500 text-sm mt-1'>{getFieldError('email')}</p>
                )}
              </div>
            </div>

            {errors.some(err => err.field === 'form') && (
              <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3'>
                <Icon icon='mdi:alert-circle' width={24} height={24} className='text-red-600' />
                <p className='text-red-700 dark:text-red-400'>{errors.find(err => err.field === 'form')?.message}</p>
              </div>
            )}

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-to-r from-primary to-teal-500 text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? (
                <>
                  <Icon icon='mdi:loading' width={20} height={20} className='animate-spin' />
                  Enviando...
                </>
              ) : (
                <>
                  <Icon icon='mdi:home-search' width={20} height={20} />
                  START YOUR PLAN
                </>
              )}
            </button>

          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white dark:bg-dark rounded-lg shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-300'>
            <div className='mb-6 flex justify-center'>
              <div className='bg-green-100 dark:bg-green-900/30 rounded-full p-4'>
                <Icon icon='mdi:check-circle' width={48} height={48} className='text-green-600' />
              </div>
            </div>
            
            <h3 className='text-2xl font-bold text-black dark:text-white mb-4'>
              ¡Formulario Enviado!
            </h3>
            
            <p className='text-gray-700 dark:text-gray-300 mb-8 leading-relaxed'>
              Muchas gracias por completar el formulario.
              <br />
              <br />
              Me pondré en contacto contigo para comentarte las mejores opciones para ti.
            </p>
            
            <button
              onClick={() => {
                setShowSuccessModal(false)
                if (onSuccess) {
                  onSuccess()
                }
              }}
              className='w-full bg-gradient-to-r from-primary to-teal-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow'
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
