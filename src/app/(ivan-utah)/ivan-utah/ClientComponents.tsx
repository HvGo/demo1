'use client'

import { useState } from 'react'

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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  })

  const handleConsultationClick = () => {
    window.location.href = '/contactus'
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const testimonials: Testimonial[] = [
    {
      name: "Hugo Harley",
      image: "/images/ivan-utah/hugoh.jpg",
      shortText: "Vendimos nuestra casa con Blue Key Realty. Iván fue excelente;...",
      fullText: "Vendimos nuestra casa con Blue Key Realty. Iván fue excelente; siempre estuvo dispuesto a responder nuestras preguntas y nos brindó el mejor asesoramiento durante todo el proceso. Recomiendo ampliamente sus servicios."
    },
    {
      name: "Alex R",
      image: "/images/ivan-utah/Alex R.jpg",
      shortText: "Iván nos ayudó a vender nuestra propiedad ecuestre en South Jordan con un profesionalismo y cuidado excepcionales...",
      fullText: "Iván nos ayudó a vender nuestra propiedad ecuestre en South Jordan con un profesionalismo y cuidado excepcionales. Nos mantuvo informados en todo momento, manejó cada detalle y trabajó arduamente para quitarnos el estrés de encima. Su conocimiento, disponibilidad y su equipo de apoyo hicieron que todo el proceso de venta fuera fluido y exitoso. Nos sentimos seguros sabiendo que nuestra propiedad estaba en excelentes manos durante toda la transacción."
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/ivan-utah/casa3_mobile.png" />
          <img 
            src="/images/ivan-utah/portada_desk.jpg" 
            alt="Utah Real Estate" 
            className="absolute inset-0 w-full h-full object-cover sm:object-cover object-center"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </picture>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-end sm:justify-center py-12 sm:py-0 pb-0">
          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-5 w-full">
            {/* Main Headline - Top */}
            <div 
              style={{
                animation: `fadeInDown 0.6s ease-out`,
              }}
              className="text-center mb-4 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto" style={{ fontFamily: 'Impact, sans-serif' }}>
                <div style={{
                  textShadow: '3px 3px 0 rgba(0, 0, 0, 1), 6px 6px 12px rgba(0, 0, 0, 0.9), -2px -2px 0 rgba(0, 0, 0, 0.8)',
                  WebkitTextStroke: '0.2px rgba(0, 0, 0, 0.8)',
                  fontFamily: 'Impact, sans-serif'
                }}>
                  <span style={{ color: '#CAA037' }}>Un mal consejo</span> <span style={{ color: '#ffffff' }}>puede costarte</span>
                </div>
                <div style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 0 rgba(0, 0, 0, 1), 6px 6px 12px rgba(0, 0, 0, 0.9), -2px -2px 0 rgba(0, 0, 0, 0.8)',
                  WebkitTextStroke: '0.2px rgba(0, 0, 0, 0.8)',
                  fontFamily: 'Impact, sans-serif',
                  position: 'relative',
                  display: 'inline-block'
                }}>
                  miles de dólares.
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '3px',
                    backgroundColor: '#CAA037',
                    borderRadius: '2px'
                  }}></div>
                </div>
              </h2>
            </div>

            {/* Main Content Grid - Image + Badges + QR on Left, Form on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 items-end">
              {/* Left Side - Ivan Image + Badges + QR */}
              <div className="w-full flex flex-col gap-0">
                {/* Ivan Image */}
                <div className="relative w-full">
                  <img 
                    src="/images/ivan-utah/ivan2.png" 
                    alt="Ivan Utah Realtor" 
                    className="w-full h-auto object-cover rounded-lg shadow-xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                
                {/* Stat Badges - Below Image in Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-0">
                  <div className="bg-primary-navy border-2 border-accent-gold rounded-lg p-3 sm:p-4 text-center flex flex-col items-center justify-center gap-2">
                    <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Ribbon */}
                      <path d="M24 8L20 20L24 28" stroke="#CAA037" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                      <path d="M40 8L44 20L40 28" stroke="#CAA037" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                      {/* Medal circle */}
                      <circle cx="32" cy="38" r="16" fill="#CAA037"/>
                      <circle cx="32" cy="38" r="13" fill="none" stroke="#001F3F" strokeWidth="1.5"/>
                      {/* Star in center */}
                      <path d="M32 28L36 36H44L38 40L40 48L32 44L24 48L26 40L20 36H28L32 28Z" fill="#001F3F"/>
                    </svg>
                    <div className="text-xl sm:text-2xl font-bold text-accent-gold">22+</div>
                    <div className="text-xs sm:text-sm font-bold text-white uppercase">Years<br/>Experience</div>
                  </div>

                  <div className="bg-primary-navy border-2 border-accent-gold rounded-lg p-3 sm:p-4 text-center flex flex-col items-center justify-center gap-2">
                    <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M32 12L42 28H52L44 36L48 52L32 44L16 52L20 36L12 28H22L32 12Z" fill="#CAA037" stroke="#CAA037" strokeWidth="1.5"/>
                    </svg>
                    <div className="text-xl sm:text-2xl font-bold text-accent-gold">1,100+</div>
                    <div className="text-xs sm:text-sm font-bold text-white uppercase">Families<br/>Served</div>
                  </div>

                  <div className="bg-primary-navy border-2 border-accent-gold rounded-lg p-3 sm:p-4 text-center flex flex-col items-center justify-center gap-2">
                    <img 
                      src="/images/ivan-utah/QR - copia.png" 
                      alt="QR Badge" 
                      className="w-12 h-12 sm:w-14 sm:h-14"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    <div className="text-xl sm:text-2xl font-bold text-accent-gold">Top 500</div>
                    <div className="text-xs sm:text-sm font-bold text-white uppercase">Salt Lake<br/>City Realtor</div>
                  </div>

                  <div className="bg-primary-navy border-2 border-accent-gold rounded-lg p-3 sm:p-4 text-center flex flex-col items-center justify-center gap-2">
                    <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Left speech bubble - EN */}
                      <circle cx="18" cy="32" r="12" stroke="#CAA037" strokeWidth="2.5"/>
                      <path d="M10 44L6 52" stroke="#CAA037" strokeWidth="2.5" strokeLinecap="round"/>
                      <text x="18" y="37" textAnchor="middle" fill="#CAA037" fontSize="10" fontWeight="bold" fontFamily="Arial">EN</text>
                      
                      {/* Right speech bubble - ES */}
                      <circle cx="46" cy="24" r="12" stroke="#CAA037" strokeWidth="2.5"/>
                      <path d="M54 36L58 44" stroke="#CAA037" strokeWidth="2.5" strokeLinecap="round"/>
                      <text x="46" y="29" textAnchor="middle" fill="#CAA037" fontSize="10" fontWeight="bold" fontFamily="Arial">ES</text>
                    </svg>
                    <div className="text-xl sm:text-2xl font-bold text-accent-gold">Bilingual</div>
                    <div className="text-xs sm:text-sm font-bold text-white uppercase">Spanish &<br/>English</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Client Reviews + Form */}
              <div className="w-full space-y-6">
                {/* Client Reviews Section */}
                <div className="w-full">
                  <div className="text-center mb-4">
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Zillow Reviews</h3>
                    <div className="w-20 h-1 bg-accent-gold mx-auto rounded-full"></div>
                  </div>

                  {/* Testimonials Grid - Smaller boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {testimonials.map((testimonial, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedTestimonial(testimonial)}
                        style={{
                          animation: `fadeInUp 0.6s ease-out ${0.1 + idx * 0.1}s both`,
                        }}
                        className="bg-primary-navy border-2 border-accent-gold p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all"
                      >
                        {/* Stars */}
                        <div className="flex gap-0.5 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-accent-gold text-sm">★</span>
                          ))}
                        </div>

                        {/* Review Text */}
                        <p className="text-white text-xs leading-tight mb-2 line-clamp-2">&ldquo;{testimonial.shortText}&rdquo;</p>

                        {/* Author with Photo */}
                        <div className="flex items-center gap-2">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-accent-gold"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/32'
                            }}
                          />
                          <div>
                            <p className="text-accent-gold font-bold text-xs">{testimonial.name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evaluation Form */}
                <div
                  style={{
                    animation: `slideInRight 0.6s ease-out 0.3s both`,
                  }}
                  className="bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-sm shadow-xl border-t-8 border-accent-gold"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">OBTENER MI ANÁLISIS DE MERCADO GRATUITO</h3>
                                   
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Nombre Completo"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/20 border border-white/30 p-2 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-xs"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        placeholder="Dirección de la propiedad (requerido)"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-white/20 border border-white/30 p-2 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-xs"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Correo Electrónico"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/20 border border-white/30 p-2 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-xs"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="Teléfono"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/20 border border-white/30 p-2 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-xs"
                      />
                    </div>
                    
      

                    <button type="submit" className="w-full bg-accent-gold text-white py-2 rounded-sm font-bold hover:bg-opacity-90 transition-all text-xs">
                      OBTENER MI ANÁLISIS DE MERCADO GRATUITO
                    </button>
                    
                    <p className="text-[9px] text-gray-300 text-center">
                      Recibe el valor de tu casa en 5 minutos.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-gold/5 -skew-x-12 transform translate-x-1/2" />
      </section>

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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
