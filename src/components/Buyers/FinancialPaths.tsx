import { Icon } from '@iconify/react'

const paths = [
  {
    title: 'The Traditional Path',
    subtitle: 'FHA/VA + Utah Housing',
    description: 'The foundation of homeownership for most Utah families. We specialize in maximizing your options by layering traditional loans with Reliable Assistance.',
    features: [
      'FHA & Conventional Loans: Buying with as little as 3% to 3.5% down.',
      'VA Loans: $0 down for our Veterans and their families.',
      'Utah Housing (DPA): The most reliable Down Payment Assistance program in the state. It is a specialized 2nd mortgage designed to cover your upfront costs so you can keep your cash in your pocket.',
      'City-Specific Grants: From Salt Lake City to West Jordan, we track local grants thatoffer "forgivable" funds for buyers in specific zip codes.'
    ],
    icon: 'mdi:home-outline'
  },
  {
    title: 'The New Construction Advantage',
    subtitle: 'Grant $20,000 + Rate Buy-downs',
    description: '"Los incentivos son la clave de la asequibilidad." Builders are currently the best source of savings in Utah. today’s market, builders are the best source of savings. We help you navigatethese high-value opportunities:',
    features: [
      'The $20,000 State Grant: Specialized guidance on the Utah First-Time Homebuyer Assistance program specifically for brand-new homes.',
      'Rate Buy-downs: We negotiate with builders to lower your interest rate (2-1 Buy-downs or Permanent), saving you hundreds of dollars on your monthly payment.',
      'Closing Cost Credits: Getting the builder to pay for your title fees and setup costs, reducing your "Cash to Close" to nearly zero.'
    ],
    icon: 'mdi:hammer-wrench'
  },
  {
    title: 'The Specialized Path',
    subtitle: 'ITIN Financing',
    description: 'ITIN Mortgage Solutions: Dignity & Homeownership. "Ser dueño de casa es posible para todos los que trabajan duro."',
    features: [
      'Experienced Guidance: We navigate the unique requirements of ITIN lending, ensuring that hard-working families without a social security number can stop renting and start building equity.',
      'Transparent Process: We explain every step in your language, ensuring no hidden fees and a clear path to your keys.'
    ],
    icon: 'mdi:account-multiple'
  }
]

export const FinancialPaths = () => {
  return (
    <section className='py-16 md:py-24 bg-gray-50 dark:bg-dark/50'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>Rutas Financieras Específicas</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Encuentra la opción de financiamiento que mejor se adapte a tu situación
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {paths.map((path, index) => (
            <div key={index} className='bg-white dark:bg-dark rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden'>
              <div className='bg-gradient-to-r from-primary to-teal-500 p-6 text-white'>
                <Icon icon={path.icon} width={40} height={40} className='mb-4' />
                <h3 className='text-2xl font-bold mb-2'>{path.title}</h3>
                <p className='text-sm font-semibold opacity-90'>{path.subtitle}</p>
              </div>
              <div className='p-6'>
                <p className='text-gray-600 dark:text-gray-400 mb-6'>{path.description}</p>
                <ul className='space-y-3'>
                  {path.features.map((feature, idx) => (
                    <li key={idx} className='flex items-start gap-3'>
                      <Icon icon='mdi:check-circle' width={20} height={20} className='text-teal-500 flex-shrink-0 mt-0.5' />
                      <span className='text-sm'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
