'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { validateGoldenQuestionsForm, ValidationError } from '@/lib/validators'

export const GoldenQuestionsForm = () => {
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
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setSuccessMessage('')
      }, 3000)
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
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>The 5 Golden Questions</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            Responde estas preguntas para conocer tu elegibilidad y encontrar la mejor ruta de financiamiento
          </p>
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
                <span className='text-primary'>2.</span> ¿Cuál es tu rango de crédito estimado?
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
              </div>
            </div>

            {/* Error Messages */}
            {errors.some(err => err.field === 'form') && (
              <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3'>
                <Icon icon='mdi:alert-circle' width={24} height={24} className='text-red-600' />
                <p className='text-red-700 dark:text-red-400'>{errors.find(err => err.field === 'form')?.message}</p>
              </div>
            )}

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
                  Enviar Respuestas
                </>
              )}
            </button>

            {submitted && successMessage && (
              <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3'>
                <Icon icon='mdi:check-circle' width={24} height={24} className='text-green-600' />
                <p className='text-green-700 dark:text-green-400'>{successMessage}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
