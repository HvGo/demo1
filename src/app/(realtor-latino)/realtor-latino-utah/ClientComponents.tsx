'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { validateRealtorLatinoUtahForm, ValidationError } from '@/lib/validators'

interface Testimonial {
  name: string
  image: string
  shortText: string
  fullText: string
}

interface ClientComponentsProps {
  whatsAppNumber: string
}

export function IvanUtahClient({ whatsAppNumber }: ClientComponentsProps) {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  })
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleConsultationClick = () => {
    window.location.href = '/contactus'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(errors.filter(err => err.field !== name))
  }

  const getFieldError = (fieldName: string) => {
    return errors.find(err => err.field === fieldName)?.message
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    const validation = validateRealtorLatinoUtahForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/realtor-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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

      setFormData({
        name: '',
        phone: '',
        email: '',
        address: ''
      })
      setShowSuccessModal(true)
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors([{ field: 'form', message: 'Error de conexión. Por favor intenta de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  const allTestimonials: Testimonial[] = [
    {
      name: "Fiorella Harley",
      image: "/images/ivan-utah/hugoh.jpg",
      shortText: "Vendimos nuestra casa con Blue Key Realty. Iván fue excelente; siempre estuvo dispuesto a responder nuestras preguntas y nos brindó el mejor asesoramiento durante todo el proceso. Recomiendo ampliamente sus servicios...",
      fullText: "Vendimos nuestra casa con Blue Key Realty. Iván fue excelente; siempre estuvo dispuesto a responder nuestras preguntas y nos brindó el mejor asesoramiento durante todo el proceso. Recomiendo ampliamente sus servicios."
    },
    {
      name: "Alex R",
      image: "/images/ivan-utah/Alex R.jpg",
      shortText: "Iván nos ayudó a vender nuestra propiedad ecuestre en South Jordan con un profesionalismo y cuidado excepcionales...",
      fullText: "Iván nos ayudó a vender nuestra propiedad ecuestre en South Jordan con un profesionalismo y cuidado excepcionales. Nos mantuvo informados en todo momento, manejó cada detalle y trabajó arduamente para quitarnos el estrés de encima. Su conocimiento, disponibilidad y su equipo de apoyo hicieron que todo el proceso de venta fuera fluido y exitoso. Nos sentimos seguros sabiendo que nuestra propiedad estaba en excelentes manos durante toda la transacción."
    }
  ]

  const testimonials = isDesktop ? allTestimonials : [allTestimonials[0]]

  return (
    <>
      {/* Hero Section - Optimized for Mobile */}
      <section className="relative w-full h-screen sm:min-h-screen overflow-hidden">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/ivan-utah/casa3_mobile.png" />
          <img 
            src="/images/ivan-utah/portada_desk.jpg" 
            alt="Utah Real Estate" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </picture>
        
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center py-4 sm:py-0">
          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-5 w-full">
            {/* Main Headline - Compact */}
            <div 
              style={{
                animation: `fadeInDown 0.6s ease-out`,
              }}
              className="text-center mb-2 sm:mb-8"
            >
              <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto" style={{ fontFamily: 'Impact, sans-serif' }}>
                <div style={{
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 1), 4px 4px 8px rgba(0, 0, 0, 0.9)',
                  WebkitTextStroke: '0.2px rgba(0, 0, 0, 0.8)',
                  fontFamily: 'Impact, sans-serif'
                }}>
                  <span style={{ color: '#CAA037' }}>Un mal consejo</span> <span style={{ color: '#ffffff' }}>puede costarte</span>
                </div>
                <div style={{
                  color: '#ffffff',
                  textShadow: '2px 2px 0 rgba(0, 0, 0, 1), 4px 4px 8px rgba(0, 0, 0, 0.9)',
                  WebkitTextStroke: '0.2px rgba(0, 0, 0, 0.8)',
                  fontFamily: 'Impact, sans-serif',
                  position: 'relative',
                  display: 'inline-block'
                }}>
                  miles de dólares.
                  <div style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '2px',
                    backgroundColor: '#CAA037',
                    borderRadius: '2px'
                  }}></div>
                </div>
              </h2>
              
              {/* Page Name - Desktop/Mobile Toggle */}
              <div className="text-center text-white text-sm sm:text-base font-semibold mt-2 sm:mt-4 page-name"></div>
            </div>

            {/* Main Content Grid - Optimized for Mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6 lg:gap-8 items-start lg:items-end">
              {/* Left Side - Ivan Image + Badges */}
              <div className="w-full flex flex-col gap-1">
                {/* Ivan Image - Smaller on Mobile */}
                <div className="relative w-full max-w-[240px] sm:max-w-none mx-auto">
                  <img 
                    src="/images/ivan-utah/ivan2.png" 
                    alt="Ivan Utah Realtor" 
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <p className="text-white text-[9px] sm:text-xs leading-tight mb-1 line-clamp-2 text-center w-full">Tu realtor latino de confianza en utah</p>
                </div>
                
                {/* Stat Badges - Single Row on Mobile */}
                <div className="grid grid-cols-4 gap-1 sm:gap-3 lg:gap-4 mt-1">
                  <div className="bg-primary-navy border-2 border-accent-gold rounded-lg p-2 sm:p-4 text-center flex flex-col items-center justify-center gap-1">
                    <svg className="w-8 h-8 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 8L20 20L24 28" stroke="#CAA037" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                      <path d="M40 8L44 20L40 28" stroke="#CAA037" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                      <circle cx="32" cy="38" r="16" fill="#CAA037"/>
                      <circle cx="32" cy="38" r="13" fill="none" stroke="#001F3F" strokeWidth="1.5"/>
                      <path d="M32 28L36 36H44L38 40L40 48L32 44L24 48L26 40L20 36H28L32 28Z" fill="#001F3F"/>
                    </svg>
                    <div className="text-sm sm:text-2xl font-bold text-accent-gold">22+</div>
                    <div className="text-[7px] sm:text-sm font-bold text-white uppercase">Years Experience</div>
                  </div>

                  <div className="bg-primary-navy border-2 border-accent-gold rounded-lg p-2 sm:p-4 text-center flex flex-col items-center justify-center gap-1">
                    <svg className="w-8 h-8 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M32 12L42 28H52L44 36L48 52L32 44L16 52L20 36L12 28H22L32 12Z" fill="#CAA037" stroke="#CAA037" strokeWidth="1.5"/>
                    </svg>
                    <div className="text-sm sm:text-2xl font-bold text-accent-gold">1.200</div>
                    <div className="text-[7px] sm:text-sm font-bold text-white uppercase">Families Served</div>
                  </div>

                  <div className="bg-primary-navy border-2 border-accent-gold rounded-lg p-2 sm:p-4 text-center flex flex-col items-center justify-center gap-1">
                    <img 
                      src="/images/ivan-utah/QR - copia.png" 
                      alt="QR Badge" 
                      className="w-8 h-8 sm:w-14 sm:h-14"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    <div className="text-sm sm:text-2xl font-bold text-accent-gold">Top 500</div>
                    <div className="text-[6px] sm:text-sm font-bold text-white uppercase">Salt Lake County</div>
                  </div>

                  <div className="bg-primary-navy border-2 border-accent-gold rounded-lg p-2 sm:p-4 text-center flex flex-col items-center justify-center gap-1">
                    <svg className="w-8 h-8 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="18" cy="32" r="12" stroke="#CAA037" strokeWidth="2.5"/>
                      <path d="M10 44L6 52" stroke="#CAA037" strokeWidth="2.5" strokeLinecap="round"/>
                      <text x="18" y="37" textAnchor="middle" fill="#CAA037" fontSize="10" fontWeight="bold" fontFamily="Arial">EN</text>
                      <circle cx="46" cy="24" r="12" stroke="#CAA037" strokeWidth="2.5"/>
                      <path d="M54 36L58 44" stroke="#CAA037" strokeWidth="2.5" strokeLinecap="round"/>
                      <text x="46" y="29" textAnchor="middle" fill="#CAA037" fontSize="10" fontWeight="bold" fontFamily="Arial">ES</text>
                    </svg>
                    <div className="text-sm sm:text-2xl font-bold text-accent-gold">Bilingual</div>
                    <div className="text-[7px] sm:text-sm font-bold text-white uppercase">Español and Ingles</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Testimonial + Form */}
              <div className="w-full space-y-2 sm:space-y-4">
                {/* Testimonials Section */}
                <div className="w-full">
                  <div className="text-center mb-2">
                    <h3 className="text-white font-bold text-sm sm:text-xl mb-1">Google Reviews</h3>
                    <div className="w-16 h-1 bg-accent-gold mx-auto rounded-full"></div>
                  </div>

                  {/* Desktop: Grid of testimonials, Mobile: Single testimonial */}
                  {isDesktop ? (
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {testimonials.map((testimonial, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedTestimonial(testimonial)}
                          className="bg-primary-navy border-2 border-accent-gold p-2 sm:p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all"
                        >
                          <div className="flex gap-0.5 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-accent-gold text-xs">★</span>
                            ))}
                          </div>

                          <p className="text-white text-[7px] sm:text-xs leading-tight mb-1 line-clamp-2">&ldquo;{testimonial.shortText}&rdquo;</p>

                          <div className="flex items-center gap-1">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-accent-gold"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/32'
                              }}
                            />
                            <p className="text-accent-gold font-bold text-[10px] sm:text-xs">{testimonial.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      onClick={() => setSelectedTestimonial(testimonials[0])}
                      className="bg-primary-navy border-2 border-accent-gold p-2 sm:p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all"
                    >
                      <div className="flex gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-accent-gold text-xs">★</span>
                        ))}
                      </div>

                      <p className="text-white text-[7px] sm:text-xs leading-tight mb-1 line-clamp-2">&ldquo;{testimonials[0].shortText}&rdquo;</p>

                      <div className="flex items-center gap-1">
                        <img
                          src={testimonials[0].image}
                          alt={testimonials[0].name}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-accent-gold"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/32'
                          }}
                        />
                        <p className="text-accent-gold font-bold text-[10px] sm:text-xs">{testimonials[0].name}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Evaluation Form - Compact */}
                <div
                  style={{
                    animation: `slideInRight 0.6s ease-out 0.3s both`,
                    willChange: 'transform'
                  }}
                  className="bg-black/40 backdrop-blur-md p-2 sm:p-4 lg:p-6 rounded-sm shadow-xl border-t-4 sm:border-t-8 border-accent-gold h-fit"
                >
                  <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-white mb-2 text-center">OBTENER MI ANÁLISIS DE MERCADO GRATUITO</h3>
                                   
                  <form onSubmit={handleFormSubmit} className="space-y-1 sm:space-y-3">
                    {/* Error Messages */}
                    {errors.some(err => err.field === 'form') && (
                      <div className='bg-red-50/20 border border-red-400/50 rounded-sm p-2 flex items-center gap-2'>
                        <Icon icon='mdi:alert-circle' width={16} height={16} className='text-red-400 flex-shrink-0' />
                        <p className='text-red-300 text-[8px] sm:text-[9px]'>{errors.find(err => err.field === 'form')?.message}</p>
                      </div>
                    )}

                    <div>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-white/20 border p-1 sm:p-2 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-[10px] sm:text-xs ${getFieldError('name') ? 'border-red-400' : 'border-white/30'}`}
                      />
                      {getFieldError('name') && (
                        <p className='text-red-300 text-[7px] sm:text-[8px] mt-0.5'>{getFieldError('name')}</p>
                      )}
                    </div>
                    <div>
                      <input 
                        type="text" 
                        name="address"
                        placeholder="Dirección de tu casa"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full bg-white/20 border p-1 sm:p-2 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-[10px] sm:text-xs ${getFieldError('address') ? 'border-red-400' : 'border-white/30'}`}
                      />
                      {getFieldError('address') && (
                        <p className='text-red-300 text-[7px] sm:text-[8px] mt-0.5'>{getFieldError('address')}</p>
                      )}
                    </div>
                    <div>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-white/20 border p-1 sm:p-2 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-[10px] sm:text-xs ${getFieldError('email') ? 'border-red-400' : 'border-white/30'}`}
                      />
                      {getFieldError('email') && (
                        <p className='text-red-300 text-[7px] sm:text-[8px] mt-0.5'>{getFieldError('email')}</p>
                      )}
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="Teléfono"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full bg-white/20 border p-1 sm:p-2 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-[10px] sm:text-xs ${getFieldError('phone') ? 'border-red-400' : 'border-white/30'}`}
                      />
                      {getFieldError('phone') && (
                        <p className='text-red-300 text-[7px] sm:text-[8px] mt-0.5'>{getFieldError('phone')}</p>
                      )}
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-accent-gold text-white py-1 sm:py-2 rounded-sm font-bold hover:bg-opacity-90 transition-all text-[10px] sm:text-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1">
                      {loading ? (
                        <>
                          <Icon icon='mdi:loading' width={14} height={14} className='animate-spin' />
                          Enviando...
                        </>
                      ) : (
                        'ANÁLISIS GRATUITO'
                      )}
                    </button>
                    
                    <p className="text-[8px] sm:text-[9px] text-gray-300 text-center">
                      Recibe el valor de tu casa en 5 minutos.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-gold/5 -skew-x-12 transform translate-x-1/2" />
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'>
          <div className='bg-primary-navy rounded-lg shadow-2xl max-w-md w-full p-6 sm:p-8 text-center animate-in fade-in zoom-in duration-300 border border-accent-gold/30'>
            <div className='mb-6 flex justify-center'>
              <div className='bg-accent-gold/20 rounded-full p-4'>
                <Icon icon='mdi:check-circle' width={48} height={48} className='text-accent-gold' />
              </div>
            </div>
            
            <h3 className='text-xl sm:text-2xl font-bold text-white mb-4'>
              ¡Formulario Enviado!
            </h3>
            
            <p className='text-gray-300 mb-8 leading-relaxed text-sm sm:text-base'>
              Muchas gracias por completar el formulario.
              <br />
              <br />
              Me pondré en contacto contigo pronto para comentarte las mejores opciones para ti.
            </p>
            
            <button
              onClick={() => setShowSuccessModal(false)}
              className='w-full bg-accent-gold text-primary-navy font-semibold py-2 sm:py-3 rounded-sm hover:bg-opacity-90 transition-all text-sm sm:text-base'
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {selectedTestimonial && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            style={{
              animation: `scaleIn 0.3s ease-out`,
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-primary-navy rounded-lg shadow-2xl max-w-2xl w-full p-4 sm:p-6 lg:p-8 border border-accent-gold/30 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <img
                src={selectedTestimonial.image}
                alt={selectedTestimonial.name}
                className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full object-cover border-2 border-accent-gold flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/64'
                }}
              />
              <div>
                <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-white">{selectedTestimonial.name}</h3>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent-gold text-xs sm:text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm lg:text-base text-gray-200 leading-relaxed whitespace-pre-line mb-4 sm:mb-6">
              {selectedTestimonial.fullText}
            </p>
            
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="w-full bg-accent-gold text-primary-navy py-2 sm:py-3 rounded-sm font-bold hover:bg-opacity-90 transition-all text-xs sm:text-sm lg:text-base"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  )
}
