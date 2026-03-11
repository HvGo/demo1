'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'

export const CMAForm = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('CMA Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id='cma-form' className='py-16 md:py-24 bg-gray-50 dark:bg-dark/50'>
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
                required
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
              />
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
            </div>

            {/* Property Condition */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Condición de la Propiedad</label>
              <select
                name='propertyCondition'
                value={formData.propertyCondition}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
              >
                <option value=''>Selecciona una opción</option>
                <option value='excellent'>Excelente</option>
                <option value='good'>Buena</option>
                <option value='fair'>Regular</option>
                <option value='needs-work'>Necesita reparaciones</option>
              </select>
            </div>

            {/* Move Timeline */}
            <div>
              <label className='block text-sm font-semibold mb-2'>¿Cuándo necesitas mudarte?</label>
              <select
                name='moveTimeline'
                value={formData.moveTimeline}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
              >
                <option value=''>Selecciona una opción</option>
                <option value='asap'>Lo antes posible (0-30 días)</option>
                <option value='soon'>Pronto (1-3 meses)</option>
                <option value='flexible'>Flexible (3-6 meses)</option>
                <option value='not-sure'>No estoy seguro</option>
              </select>
            </div>

            {/* Personal Info */}
            <div className='border-t border-gray-200 dark:border-gray-700 pt-6'>
              <p className='text-sm font-semibold mb-4'>Información de Contacto</p>
              <div className='space-y-4'>
                <input
                  type='text'
                  name='name'
                  placeholder='Nombre completo'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
                />
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
                />
                <input
                  type='tel'
                  name='phone'
                  placeholder='Teléfono'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary'
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-primary to-teal-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2'
            >
              <Icon icon='mdi:send' width={20} height={20} />
              Obtener CMA Gratuito
            </button>

            {submitted && (
              <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3'>
                <Icon icon='mdi:check-circle' width={24} height={24} className='text-green-600' />
                <p className='text-green-700 dark:text-green-400'>¡Gracias! Te enviaremos tu CMA en 24 horas.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
