'use client'

/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

interface FormState {
  name: string
  email: string
  message: string
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

type UTMData = {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  referrer?: string
}

const SESSION_KEY = 'session_id'
const UTM_KEY = 'utm_data'

function getSessionIdFromStorage() {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(SESSION_KEY) || ''
}

function captureUTM(): UTMData {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const utmSource = params.get('utm_source') || undefined
  const utmMedium = params.get('utm_medium') || undefined
  const utmCampaign = params.get('utm_campaign') || undefined
  const referrer = document.referrer || undefined
  const utm: UTMData = { utmSource, utmMedium, utmCampaign, referrer }
  // Persist first touch
  localStorage.setItem(UTM_KEY, JSON.stringify(utm))
  return utm
}

function getStoredUTM(): UTMData {
  if (typeof window === 'undefined') return {}
  const stored = localStorage.getItem(UTM_KEY)
  if (!stored) return {}
  try {
    return JSON.parse(stored)
  } catch (_) {
    return {}
  }
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  })

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  })

  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [sessionId, setSessionId] = useState('')
  const [utmData, setUtmData] = useState<UTMData>({})

  // Capturar sessionId y UTM/referrer al cargar
  useEffect(() => {
    const sid = getSessionIdFromStorage()
    setSessionId(sid)

    const stored = getStoredUTM()
    if (Object.keys(stored).length > 0) {
      setUtmData(stored)
    } else {
      const utm = captureUTM()
      setUtmData(utm)
    }
  }, [])

  // Validar email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address'
    } else if (formData.email.length > 100) {
      newErrors.email = 'Email must be less than 100 characters'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.length > 5000) {
      newErrors.message = 'Message must be less than 5000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar cambios en inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validar formulario
    if (!validateForm()) {
      setStatus({
        type: 'error',
        message: 'Please fix the errors above'
      })
      return
    }

    // Enviar datos
    setStatus({
      type: 'loading',
      message: 'Sending your message...'
    })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          sessionId,
          utmSource: utmData.utmSource,
          utmMedium: utmData.utmMedium,
          utmCampaign: utmData.utmCampaign,
          referrer: utmData.referrer || document.referrer || undefined,
        })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Thank you! Your message has been sent successfully.'
        })
        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          message: ''
        })
        setErrors({})
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.'
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-8'>
        {/* Status Messages */}
        {status.type !== 'idle' && (
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            status.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
              : status.type === 'error'
              ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
          }`}>
            <Icon 
              icon={
                status.type === 'success' 
                  ? 'ph:check-circle-fill' 
                  : status.type === 'error'
                  ? 'ph:warning-circle-fill'
                  : 'ph:spinner'
              }
              width={20}
              height={20}
              className={`flex-shrink-0 mt-0.5 ${
                status.type === 'success' 
                  ? 'text-green-600 dark:text-green-400' 
                  : status.type === 'error'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-blue-600 dark:text-blue-400 animate-spin'
              }`}
            />
            <p className={`text-sm ${
              status.type === 'success' 
                ? 'text-green-700 dark:text-green-300' 
                : status.type === 'error'
                ? 'text-red-700 dark:text-red-300'
                : 'text-blue-700 dark:text-blue-300'
            }`}>
              {status.message}
            </p>
          </div>
        )}

        {/* Name Input */}
        <div>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Name*'
            value={formData.name}
            onChange={handleChange}
            disabled={status.type === 'loading'}
            className={`px-6 py-3.5 border rounded-full outline-primary focus:outline w-full transition ${
              errors.name 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-black/10 dark:border-white/10'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          />
          {errors.name && (
            <p className='text-red-500 dark:text-red-400 text-sm mt-1'>{errors.name}</p>
          )}
        </div>

        {/* Email Input */}
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Email address*'
          value={formData.email}
          onChange={handleChange}
          disabled={status.type === 'loading'}
          className={`px-6 py-3.5 border rounded-full outline-primary focus:outline w-full transition ${
            errors.email 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-black/10 dark:border-white/10'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        {errors.email && (
          <p className='text-red-500 dark:text-red-400 text-sm mt-1'>{errors.email}</p>
        )}

        {/* Message Textarea */}
        <div>
          <textarea
            rows={8}
            cols={50}
            name='message'
            id='message'
            placeholder='Write here your message'
            value={formData.message}
            onChange={handleChange}
            disabled={status.type === 'loading'}
            className={`px-6 py-3.5 border rounded-2xl outline-primary focus:outline w-full transition resize-none ${
              errors.message 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-black/10 dark:border-white/10'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          />
          {errors.message && (
            <p className='text-red-500 dark:text-red-400 text-sm mt-1'>{errors.message}</p>
          )}
          <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
            {formData.message.length}/5000 characters
          </p>
        </div>

        {/* Submit Button */}
        <button 
          type='submit'
          disabled={status.type === 'loading'}
          className='px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:cursor-pointer hover:bg-primary/90 duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
        >
          {status.type === 'loading' && (
            <Icon icon='ph:spinner' width={20} height={20} className='animate-spin' />
          )}
          {status.type === 'loading' ? 'Sending...' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
