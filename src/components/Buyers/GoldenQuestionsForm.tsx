'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { validateGoldenQuestionsForm, ValidationError } from '@/lib/validators'
import ConsentCheckbox from '@/components/shared/ConsentCheckbox'

interface GoldenQuestionsFormProps {
  onSuccess?: () => void
}

export const GoldenQuestionsForm = ({ onSuccess }: GoldenQuestionsFormProps = {}) => {
  const [formData, setFormData] = useState({
    firstTimebuyer: '',
    creditScore: '',
    constructionType: '',
    contactPreference: '',
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
    // Limpiar errores del campo cuando el usuario empieza a escribir
    setErrors(errors.filter(err => err.field !== name))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    setSuccessMessage('')

    // Validar datos
    const validation = validateGoldenQuestionsForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    if (!consent) {
      setErrors([{ field: 'form', message: 'Por favor acepta ser contactado para continuar' }])
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/forms/golden-questions', {
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
        firstTimebuyer: '',
        creditScore: '',
        constructionType: '',
        contactPreference: '',
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

  const getFieldError = (fieldName: string) => {
    return errors.find(err => err.field === fieldName)?.message
  }

  return (
    <section id='golden-questions' className='py-16 md:py-24 bg-white dark:bg-dark'>
      <div className='container max-w-4xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>No dejes que el pago inicial detenga tus sueños!</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            In Utah, you don&apos;t need 20% down to own a home. We specialize in leveraging state and city programs to keep your savings in your pocket.
          </p>
          <hr className='my-4 border-gray-300 dark:border-gray-600'/>
          <p className='text-lg text-gray-600 dark:text-gray-400'>Reponde estás preguntas para conocer la mejor ruta de financiamiento.</p>
        </div>

        <div className='bg-gradient-to-br from-primary/5 to-teal-500/5 rounded-lg p-8 md:p-12 border border-primary/20'>
        
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Question 1 */}
            <div>
              <label className='block text-sm font-semibold mb-3'>
                <span className='text-primary'>1.</span> ¿Es tu primer compra de casa?
              </label>
              <div className='flex gap-4'>
                {['Sí', 'No'].map(option => (
                  <label key={option} className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      name='firstTimebuyer'
                      value={option}
                      checked={formData.firstTimebuyer === option}
                      onChange={handleChange}
                      className='w-4 h-4'
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {getFieldError('firstTimebuyer') && (
                <p className='text-red-500 text-sm mt-2'>{getFieldError('firstTimebuyer')}</p>
              )}
            </div>

            {/* Question 2 */}
            <div>
              <label className='block text-sm font-semibold mb-3'>
                <span className='text-primary'>2.</span> ¿Cuál es tu puntaje de crédito aproximado?
              </label>
              <select
                name='creditScore'
                value={formData.creditScore}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
              >
                <option value=''>Selecciona una opción</option>
                <option value='620+'>620+</option>
                <option value='660+'>660+</option>
                <option value='700+'>700+</option>
                <option value='750+'>750+</option>
                <option value='0'>No sé mi credito</option>
              </select>
              {getFieldError('creditScore') && (
                <p className='text-red-500 text-sm mt-2'>{getFieldError('creditScore')}</p>
              )}
            </div>

            {/* Question 3 */}
            <div>
              <label className='block text-sm font-semibold mb-3'>
                <span className='text-primary'>3.</span> ¿Prefieres casa nueva o existente?
              </label>
              <div className='flex gap-4'>
                {['Nueva', 'Existente', 'Ambas'].map(option => (
                  <label key={option} className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      name='constructionType'
                      value={option}
                      checked={formData.constructionType === option}
                      onChange={handleChange}
                      className='w-4 h-4'
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {getFieldError('constructionType') && (
                <p className='text-red-500 text-sm mt-2'>{getFieldError('constructionType')}</p>
              )}
            </div>

            {/* Question 4 */}
            <div>
              <label className='block text-sm font-semibold mb-3'>
                <span className='text-primary'>4.</span> ¿Cómo prefieres que nos contactemos?
              </label>
              <select
                name='contactPreference'
                value={formData.contactPreference}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
              >
                <option value=''>Selecciona una opción</option>
                <option value='phone'>Teléfono</option>
                <option value='email'>Email</option>
                <option value='whatsapp'>WhatsApp</option>
              </select>
              {getFieldError('contactPreference') && (
                <p className='text-red-500 text-sm mt-2'>{getFieldError('contactPreference')}</p>
              )}
            </div>

            {/* Question 5 - Personal Info */}
            <div className='border-t border-primary/20 pt-6'>
              <p className='text-sm font-semibold mb-4'>
                <span className='text-primary'>5.</span> Cuéntanos sobre ti
              </p>
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

            {/* Error Messages */}
            {errors.some(err => err.field === 'form') && (
              <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3'>
                <Icon icon='mdi:alert-circle' width={24} height={24} className='text-red-600' />
                <p className='text-red-700 dark:text-red-400'>{errors.find(err => err.field === 'form')?.message}</p>
              </div>
            )}

            {/* Consent Checkbox */}
            <ConsentCheckbox checked={consent} onChange={setConsent} id="golden-questions-consent" />

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading || !consent}
              className='w-full  from-primary to-teal-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
              style={{ backgroundColor: '#2937b0' }}>
              {loading ? (
                <>
                  <Icon icon='mdi:loading' width={20} height={20} className='animate-spin' />
                  Enviando...
                </>
              ) : (
                <>
                  <Icon icon='mdi:send' width={20} height={20}  />
                  Enviar Respuestas
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
              className='w-full  from-primary to-teal-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow' 
              style={{ backgroundColor: '#2937b0' }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
