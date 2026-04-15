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
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-2xl font-bold tracking-tighter text-primary-navy">IVAN UTAH REALTOR</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex flex-col items-end mr-4">
                <span className="text-xs text-gray-500 uppercase tracking-widest">Call us</span>
                <span className="text-sm font-bold text-primary-navy">{whatsAppNumber}</span>
              </div>
              <button 
                onClick={handleConsultationClick}
                className="bg-accent-gold text-white px-6 py-2.5 rounded-sm font-bold text-sm hover:bg-opacity-90 transition-all shadow-lg shadow-accent-gold/20"
              >
                CONSULTATION
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/ivan-utah/portada_movil.jpg" />
          <img 
            src="/images/ivan-utah/portada.jpg" 
            alt="Utah Real Estate" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-1 sm:px-3 lg:px-5 w-full">
            {/* Main Headline - Top */}
            <div 
              style={{
                animation: `fadeInDown 0.6s ease-out`,
              }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto" style={{ fontFamily: 'Impact, sans-serif' }}>
                <div style={{
                  color: '#ffffff',
                  textShadow: '3px 3px 0 rgba(0, 0, 0, 1), 6px 6px 12px rgba(0, 0, 0, 0.9), -2px -2px 0 rgba(0, 0, 0, 0.8)',
                  WebkitTextStroke: '0.2px rgba(0, 0, 0, 0.8)',
                  fontFamily: 'Impact, sans-serif'
                }}>
                  ¡NO PIERDAS MILES DE DOLARES POR UN MAL CONSEJO!.
                </div>
              </h2>
            </div>

            {/* Content Grid - Testimonials + Image on Left, Form on Right */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Side - Testimonials (Vertical) + Image */}
              <div
                style={{
                  animation: `slideInLeft 0.6s ease-out 0.2s both`,
                }}
                className="flex flex-col lg:flex-row gap-6 items-start"
              >
                {/* Testimonials Section - Vertical on Left */}
                <div className="w-full lg:w-1/3 space-y-4">
                  <h3 className="text-white font-bold text-lg">TESTIMONIOS DE CLIENTES SATISFECHOS</h3>
                  {testimonials.map((testimonial, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedTestimonial(testimonial)}
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${0.1 + idx * 0.1}s both`,
                      }}
                      className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 cursor-pointer hover:bg-white/20 transition-all"
                    >
                      <div className="flex gap-3 mb-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover border border-accent-gold"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/40'
                          }}
                        />
                        <div>
                          <p className="text-accent-gold font-bold text-sm">{testimonial.name}</p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-accent-gold text-[10px]">★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-white text-xs leading-tight line-clamp-4">&ldquo;{testimonial.shortText}&rdquo;</p>
                    </div>
                  ))}
                </div>

                {/* Ivan Image with Stat Badges - Right of Testimonials */}
                <div className="relative w-full lg:w-2/3">
                  <img 
                    src="/images/ivan-utah/ivan.png" 
                    alt="Ivan Utah Realtor" 
                    className="w-full h-auto object-cover rounded-lg shadow-xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  
                  {/* Stat Badges */}
                  <div className="absolute top-4 left-4 bg-white/95 rounded-lg p-3 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-navy">23</div>
                      <div className="text-xs font-bold text-gray-600 uppercase">Años de<br/>Experiencia</div>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/95 rounded-lg p-3 shadow-lg">
                    <div className="text-center">
                      <div className="text-sm font-bold text-primary-navy">TOP</div>
                      <div className="text-xs font-bold text-gray-600 uppercase">Experiencia</div>
                      <div className="text-lg font-bold text-accent-gold mt-1">500</div>
                      <div className="text-xs font-bold text-gray-600">SL Realtor</div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-white/95 rounded-lg p-3 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-navy">+1,200</div>
                      <div className="text-xs font-bold text-gray-600 uppercase">Familias<br/>Ayudadas</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    VENDIDO / SOLD
                  </div>
                </div>
              </div>

              {/* Right Side - Evaluation Form */}
              <div
                style={{
                  animation: `slideInRight 0.6s ease-out 0.3s both`,
                }}
                className="bg-black/40 backdrop-blur-md p-6 lg:p-8 rounded-sm shadow-xl border-t-8 border-accent-gold"
              >
                <h3 className="text-2xl font-bold text-white mb-2">OBTENER MI ANÁLISIS DE MERCADO GRATUITO</h3>
                <p className="text-xs text-gray-300 mb-6">Dirección de la propiedad (requerido)</p>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Tu Nombre Completo"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/20 border border-white/30 p-3 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Tu Teléfono / WhatsApp (muy importante)"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white/20 border border-white/30 p-3 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Tu Correo Electrónico"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/20 border border-white/30 p-3 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Dirección de la propiedad (requerido)"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-white/20 border border-white/30 p-3 rounded-sm focus:ring-2 focus:ring-accent-gold transition-all font-medium text-white placeholder-gray-300 text-sm"
                    />
                  </div>

                  <button type="submit" className="w-full bg-accent-gold text-white py-3 rounded-sm font-bold hover:bg-opacity-90 transition-all text-sm">
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
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-gold/5 -skew-x-12 transform translate-x-1/2" />
      </section>

      {/* Testimonial Modal */}
      {selectedTestimonial && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            style={{
              animation: `scaleIn 0.3s ease-out`,
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-primary-navy rounded-lg shadow-2xl max-w-2xl w-full p-8 border border-accent-gold/30"
          >
            <div className="flex items-start gap-4 mb-6">
              <img
                src={selectedTestimonial.image}
                alt={selectedTestimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-accent-gold flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/64'
                }}
              />
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedTestimonial.name}</h3>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent-gold">★</span>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-gray-200 leading-relaxed whitespace-pre-line mb-6">
              {selectedTestimonial.fullText}
            </p>
            
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="w-full bg-accent-gold text-primary-navy py-3 rounded-sm font-bold hover:bg-opacity-90 transition-all"
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
