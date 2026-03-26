import { Icon } from '@iconify/react'

const steps = [
  { number: 1, title: 'Consulting and CMA', description: 'Comparative Market Analysis and Customized Strategy' },
  { number: 2, title: 'Optimization', description: 'Preparing and staging the property' },
  { number: 3, title: 'Digital Release', description: 'Exposure across multiple platforms and social media' },
  { number: 4, title: 'Market Management', description: 'Negotiation and tracking of bids' },
  { number: 5, title: 'Closure and Legacy', description: 'Successful completion and transition' },
]

export const SellingProcess = () => {
  return (
    <section id='process' className='py-16 md:py-24 bg-white dark:bg-dark'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>5-Step Process for Selling</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            A proven strategy for maximizing the value of your property
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
          {steps.map((step, index) => (
            <div key={step.number} className='relative'>
              <div className='bg-gradient-to-br from-primary/10 to-teal-500/10 rounded-lg p-6 h-full border border-primary/20'>
                <div className='w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4'>
                  {step.number}
                </div>
                <h3 className='text-lg font-semibold mb-2'>{step.title}</h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className='hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2'>
                  <Icon icon='mdi:arrow-right' width={24} height={24} className='text-primary' />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
