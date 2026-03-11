import { Icon } from '@iconify/react'

const testimonials = [
  {
    name: 'Cristian Medina',
    title: 'Primer Comprador',
    story: 'Éxito de Primer Comprador',
    quote: 'Ivan y su equipo me ayudaron a comprar mi primera casa. Gracias a su educación sobre financiamiento FHA, pude calificar y ahora soy dueño de mi hogar. ¡Increíble experiencia!',
    result: 'Compra exitosa con financiamiento FHA'
  },
  {
    name: 'Hugo Hartley',
    title: 'Vendedor',
    story: 'Vendedor con $15k Adicionales',
    quote: 'Pensé que mi casa se vendería al precio de mercado, pero el equipo de Blue Key la posicionó estratégicamente y obtuve $15,000 más. Su marketing fue impresionante.',
    result: 'Venta 15% arriba del valor estimado'
  },
  {
    name: 'Juan Roman',
    title: 'Comprador de Construcción Nueva',
    story: 'Negociación de Incentivos',
    quote: 'Ivan negoció un grant de $20,000 y un rate buy-down para mi casa nueva. Su experiencia en incentivos me ahorró miles de dólares en intereses.',
    result: 'Grant de $20k + Rate buy-down asegurado'
  }
]

export const TestimonialsSection = () => {
  return (
    <section className='py-16 md:py-24 bg-white dark:bg-dark'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Real Stories. Real Results.</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Historias de éxito de familias que lograron sus sueños de propiedad
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='bg-gradient-to-br from-primary/5 to-teal-500/5 rounded-lg p-8 border border-primary/20'>
              {/* Stars */}
              <div className='flex gap-1 mb-4'>
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} icon='mdi:star' width={20} height={20} className='text-yellow-400' />
                ))}
              </div>

              {/* Quote */}
              <p className='text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed'>
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className='border-t border-primary/20 pt-6'>
                <h3 className='font-bold text-lg mb-1'>{testimonial.name}</h3>
                <p className='text-primary font-semibold text-sm mb-3'>{testimonial.story}</p>
                <div className='bg-white dark:bg-dark/50 rounded p-3'>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    <span className='font-semibold text-teal-600 dark:text-teal-400'>Resultado: </span>
                    {testimonial.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className='mt-12 bg-gradient-to-r from-primary to-teal-500 rounded-lg p-8 md:p-12 text-white text-center'>
          <h3 className='text-2xl md:text-3xl font-bold mb-4'>¿Listo para tu propia historia de éxito?</h3>
          <p className='text-lg opacity-90 mb-8 max-w-2xl mx-auto'>
            Únete a cientos de familias que han logrado sus sueños de propiedad con Blue Key Realty
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a href='/buyers' className='px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors'>
              Soy Comprador
            </a>
            <a href='/sellers' className='px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors'>
              Soy Vendedor
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
