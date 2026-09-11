'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { validateCMAForm, ValidationError } from '@/lib/validators'
import ConsentCheckbox from '@/components/shared/ConsentCheckbox'

interface CMAFormProps {
  onSuccess?: () => void
  onClose?: () => void
}

export const CMAForm = ({ onSuccess, onClose }: CMAFormProps = {}) => {
  const [formData, setFormData] = useState({
    address: '',
    sellingGoal: '',
    propertyCondition: '',
    moveTimeline: '',
    name: '',
    email: '',
    phone: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [successMessage, setSuccessMessage] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [consent, setConsent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    const validation = validateCMAForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/forms/cma-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
      setFormData({
        address: '',
        sellingGoal: '',
        propertyCondition: '',
        moveTimeline: '',
        name: '',
        email: '',
        phone: ''
      })
      setConsent(false)
      setSubmitted(true)
      setShowSuccessModal(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors([{ field: 'form', message: 'Error de conexión. Por favor intenta de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <section id='market-intelligence' className='py-16 md:py-24 bg-gray-50 dark:bg-dark/50'>
      <div className='container max-w-4xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Análisis de Plusvalía (CMA)</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            Obtén una valuación profesional y personalizada de tu propiedad
          </p>
        </div>

        <div className='bg-white dark:bg-dark rounded-lg shadow-lg p-8 md:p-12'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Address */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Dirección de la Propiedad</label>
              <input
                type='text'
                name='address'
                placeholder='Ej: 123 Main Street, Salt Lake City, UT'
                value={formData.address}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
              />
              {getFieldError('address') && (
                <p className='text-red-500 text-sm mt-1'>{getFieldError('address')}</p>
              )}
            </div>

            {/* Selling Goal */}
            <div>
              <label className='block text-sm font-semibold mb-2'>¿Cuál es tu objetivo principal?</label>
              <div className='space-y-3'>
                {['Maximizar dinero', 'Vender rápido', 'Ambos'].map(option => (
                  <label key={option} className='flex items-center gap-3 cursor-pointer'>
                    <input
                      type='radio'
                      name='sellingGoal'
                      value={option}
                      checked={formData.sellingGoal === option}
                      onChange={handleChange}
                      className='w-4 h-4'
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {getFieldError('sellingGoal') && (
                <p className='text-red-500 text-sm mt-2'>{getFieldError('sellingGoal')}</p>
              )}
            </div>

            {/* Property Condition */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Condición de la Propiedad</label>
              <select
                name='propertyCondition'
                value={formData.propertyCondition}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
              >
                <option value=''>Selecciona una opción</option>
                <option value='excellent'>Excelente</option>
                <option value='good'>Buena</option>
                <option value='fair'>Regular</option>
                <option value='needs-work'>Necesita reparaciones</option>
              </select>
              {getFieldError('propertyCondition') && (
                <p className='text-red-500 text-sm mt-1'>{getFieldError('propertyCondition')}</p>
              )}
            </div>

            {/* Move Timeline */}
            <div>
              <label className='block text-sm font-semibold mb-2'>¿Cuándo necesitas mudarte?</label>
              <select
                name='moveTimeline'
                value={formData.moveTimeline}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
              >
                <option value=''>Selecciona una opción</option>
                <option value='asap'>Lo antes posible (0-30 días)</option>
                <option value='soon'>Pronto (1-3 meses)</option>
                <option value='flexible'>Flexible (3-6 meses)</option>
                <option value='not-sure'>No estoy seguro</option>
              </select>
              {getFieldError('moveTimeline') && (
                <p className='text-red-500 text-sm mt-1'>{getFieldError('moveTimeline')}</p>
              )}
            </div>

            {/* Personal Info */}
            <div className='border-t border-gray-200 dark:border-gray-700 pt-6'>
              <p className='text-sm font-semibold mb-4'>Información de Contacto</p>
              <div className='space-y-4'>
                <div>
                  <input
                    type='text'
                    name='name'
                    placeholder='Nombre completo'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  {getFieldError('name') && (
                    <p className='text-red-500 text-sm mt-1'>{getFieldError('name')}</p>
                  )}
                </div>
                <div>
                  <input
                    type='tel'
                    name='phone'
                    placeholder='Teléfono'
                    value={formData.phone}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  {getFieldError('phone') && (
                    <p className='text-red-500 text-sm mt-1'>{getFieldError('phone')}</p>
                  )}
                </div>
                <div>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  {getFieldError('email') && (
                    <p className='text-red-500 text-sm mt-1'>{getFieldError('email')}</p>
                  )}
                </div>
              </div>
            </div>

            {errors.some(err => err.field === 'form') && (
              <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3'>
                <Icon icon='mdi:alert-circle' width={24} height={24} className='text-red-600' />
                <p className='text-red-700 dark:text-red-400'>{errors.find(err => err.field === 'form')?.message}</p>
              </div>
            )}

            {/* Consent Checkbox */}
            <ConsentCheckbox checked={consent} onChange={setConsent} id="cma-form-consent" />

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-to-r from-primary to-teal-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? (
                <>
                  <Icon icon='mdi:loading' width={20} height={20} className='animate-spin' />
                  Enviando...
                </>
              ) : (
                <>
                  <Icon icon='mdi:send' width={20} height={20} />
                  Obtener CMA Gratuito
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </section>

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
              if (onClose) {
                onClose()
              }
            }}
            className='w-full bg-gradient-to-r from-primary to-teal-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow'
          >
            Entendido
          </button>
        </div>
      </div>
    )}
    </>
  )
}
