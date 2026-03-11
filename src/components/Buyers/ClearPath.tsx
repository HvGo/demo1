import { Icon } from '@iconify/react'

const steps = [
  {
    number: 1,
    title: 'Strategy Session',
    description: 'A bilingual consultation to review budget, goals, and must-haves.',
    icon: 'mdi:chat-outline'
  },
  {
    number: 2,
    title: 'Mortgage Matchmaking',
    description: 'Connect with lenders experienced in DPA/grants so your loan gets approved.',
    icon: 'mdi:handshake'
  },
  {
    number: 3,
    title: 'Targeted Questions',
    description: 'We find homes that fit your family and qualify for the programs you need.',
    icon: 'mdi:home-search'
  },
  {
    number: 4,
    title: 'Expert Negotiation',
    description: 'Win multiple-offer situations while protecting your earnest money.',
    icon: 'mdi:briefcase-check'
  },
  {
    number: 5,
    title: 'Closing & Celebration',
    description: 'Final walkthrough + closing papers explained clearly so you sign with confidence.',
    icon: 'mdi:key-variant'
  }
]

export const ClearPath = () => {
  return (
    <section className='py-16 md:py-24 bg-gray-50 dark:bg-dark/50'>
      <div className='container max-w-4xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>The "Clear Path" to Your Keys</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            A simple 5-step process so you feel confident at every stage.
          </p>
        </div>

        {/* Timeline */}
        <div className='relative'>
          {/* Vertical line */}
          <div className='absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-teal-500 transform md:-translate-x-1/2'></div>

          {/* Steps */}
          <div className='space-y-8'>
            {steps.map((step, index) => (
              <div key={step.number} className={`relative flex gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Icon */}
                <div className='flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg relative z-10 flex items-center justify-center'>
                  <Icon icon={step.icon} width={24} height={24} />
                </div>

                {/* Content */}
                <div className={`flex-1 bg-white dark:bg-dark rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow ${index % 2 === 0 ? 'md:mr-auto md:w-1/2 md:pr-12' : 'md:ml-auto md:w-1/2 md:pl-12'}`}>
                  <div className='flex items-start gap-3 mb-2'>
                    <span className='text-primary font-bold text-xl'>{step.number}.</span>
                    <h3 className='text-xl font-bold text-primary'>{step.title}</h3>
                  </div>
                  <p className='text-gray-600 dark:text-gray-400'>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className='mt-12 text-center'>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            Ready to start your journey? Let&apos;s schedule your Strategy Session today.
          </p>
          <a href='#golden-questions' className='inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow'>
            <Icon icon='mdi:calendar' width={20} height={20} />
            Schedule Your Session
          </a>
        </div>
      </div>
    </section>
  )
}
