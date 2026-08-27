'use client'

import { useState } from 'react'
import ConsentCheckbox from '@/components/shared/ConsentCheckbox'

interface PropertyContactModalProps {
  propertyId: string
  propertyAddress?: string
  onClose: () => void
  onSubmit: (data: ContactData) => Promise<void>
}

export interface ContactData {
  propertyId: string
  propertyAddress: string
  name: string
  email: string
  phone: string
}

export default function PropertyContactModal({
  propertyId,
  propertyAddress = 'Propiedad',
  onClose,
  onSubmit,
}: PropertyContactModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [consent, setConsent] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validar campos
    if (!formData.name.trim()) {
      setError('Por favor ingresa tu nombre')
      return
    }
    if (!formData.email.trim()) {
      setError('Por favor ingresa tu email')
      return
    }
    if (!formData.phone.trim()) {
      setError('Por favor ingresa tu teléfono')
      return
    }
    if (!consent) {
      setError('Por favor acepta ser contactado para continuar')
      return
    }

    setIsLoading(true)

    try {
      await onSubmit({
        propertyId,
        propertyAddress,
        ...formData,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Información de Contacto</h2>
          <p className="text-blue-100 text-sm mt-1">Nos enviaremos información sobre esta propiedad</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Property Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Propiedad
            </label>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <p className="text-sm text-gray-900 font-medium">{propertyAddress}</p>
              <p className="text-xs text-gray-500 mt-1">ID: {propertyId}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo *
              </label>
              <input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono *
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            {/* Consent Checkbox */}
            <ConsentCheckbox checked={consent} onChange={setConsent} id="property-contact-consent" />

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading || !consent}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar'
                )}
              </button>
            </div>
          </form>

          {/* Info */}
          <p className="text-xs text-gray-500 text-center pt-2">
            Pronto recibirás información completa sobre esta propiedad
          </p>
        </div>
      </div>
    </div>
  )
}
