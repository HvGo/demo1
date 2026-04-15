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
      name: "Carlos Gonzalez",
      image: "/images/ivan-utah/Carlos Gonzalez.jpg",
      shortText: "Ivan fue excepcional durante todo el proceso de compra de mi casa. Como comprador primerizo, tenía muchas preguntas e incertidumbre sobre mi presupuesto...",
      fullText: "Ivan fue excepcional durante todo el proceso de compra de mi casa. Como comprador primerizo, tenía muchas preguntas e incertidumbre sobre mi presupuesto. Ivan y su equipo fueron increíblemente pacientes y se tomaron el tiempo para responder a todas mis preguntas, brindándome una guía clara y atenta en cada paso del proceso.\n\nUna vez que encontré una casa que me interesaba, Ivan y su equipo trabajaron arduamente para encontrar la mejor solución posible para nosotros. Su conocimiento, profesionalismo y dedicación fueron realmente sobresalientes. Ivan tiene una amplia experiencia y sabe perfectamente cómo guiar a los compradores durante todo el proceso.\n\nHizo que lo que podría haber sido una experiencia estresante se sintiera simple y fácil de entender para un comprador primerizo como yo. Recomiendo ampliamente contactar a Ivan si estás pensando en comprar una casa."
    },
    {
      name: "Alex R",
      image: "/images/ivan-utah/Alex R.jpg",
      shortText: "Ivan helped us sell our horse property in South Jordan with outstanding professionalism and care. He kept us informed at all times...",
      fullText: "Ivan helped us sell our horse property in South Jordan with outstanding professionalism and care. He kept us informed at all times, handled every detail, and worked hard to take the stress off our shoulders. His knowledge, availability, and supportive team made the entire selling process smooth and successful. We felt confident knowing our property was in excellent hands throughout the sale."
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/ivan-utah/portada_movil.jpg" />
          <img 
            src="/images/ivan-utah/portada.jpg" 
            alt="Utah Real Estate" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center py-4 sm:py-0">
          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-5 w-full">
            {/* Main Headline - Top */}
            <div 
              style={{
                animation: `fadeInDown 0.6s ease-out`,
              }}
              className="text-center mb-6 sm:mb-12"
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

            {/* Main Content Grid - Image + Badges on Left, Form on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 items-end">
              {/* Left Side - Ivan Image + Badges */}
              <div className="w-full">
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
                  <div className="bg-primary-navy border-2 border-accent-gold rounded-lg p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-accent-gold">22+</div>
                    <div className="text-xs sm:text-sm font-bold text-white uppercase">Years<br/>Experience</div>
                  </div>

                  <div className="bg-primary-navy border-2 border-accent-gold rounded-lg p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-accent-gold">1,100+</div>
                    <div className="text-xs sm:text-sm font-bold text-white uppercase">Families<br/>Served</div>
                  </div>

                  <div className="bg-primary-navy border-2 border-accent-gold rounded-lg p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-accent-gold">Top 500</div>
                    <div className="text-xs sm:text-sm font-bold text-white uppercase">Salt Lake<br/>City Realtor</div>
                  </div>

                  <div className="bg-primary-navy border-2 border-accent-gold rounded-lg p-3 sm:p-4 text-center">
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
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Client Reviews</h3>
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
                        className="bg-white/95 p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all"
                      >
                        {/* Stars */}
                        <div className="flex gap-0.5 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-accent-gold text-sm">★</span>
                          ))}
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700 text-xs leading-tight mb-2 line-clamp-2">&ldquo;{testimonial.shortText}&rdquo;</p>

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
                            <p className="text-primary-navy font-bold text-xs">{testimonial.name}</p>
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
                  <p className="text-xs text-gray-300 mb-4">Dirección de la propiedad (requerido)</p>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Tu Nombre Completo"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/20 border border-white/30 p-2 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-xs"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="Tu Teléfono / WhatsApp (muy importante)"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/20 border border-white/30 p-2 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-xs"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Tu Correo Electrónico"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
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
