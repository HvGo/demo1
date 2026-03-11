import { Icon } from '@iconify/react'

const wealthStrategies = [
  {
    title: 'House Hacking',
    description: 'We identify homes with basement apartments or ADUs to help pay your mortgage with rental income.',
    icon: 'mdi:home-multiple',
    benefit: 'Turn your home into income'
  },
  {
    title: 'Appreciation Zones',
    description: 'We target high-growth areas like Saratoga Springs, Eagle Mountain, and Herriman where property values are projected to climb.',
    icon: 'mdi:trending-up',
    benefit: 'Build equity faster'
  }
]

export const WealthFactor = () => {
  return (
    <section className='py-16 md:py-24 bg-white dark:bg-dark'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>The Wealth Factor</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Don&apos;t just buy a home; start an investment. At Blue Key Realty, we look for properties that work for you.
          </p>
        </div>

        <div className='bg-gradient-to-r from-primary/10 to-teal-500/10 rounded-lg p-8 md:p-12 border border-primary/20 mb-12'>
          <p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
            We educate our buyers on how to turn a home into a <span className='font-semibold text-primary'>wealth-building machine</span>. Whether you&apos;re a first-time buyer or an experienced investor, we help you make strategic decisions that maximize your financial growth.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {wealthStrategies.map((strategy, index) => (
            <div key={index} className='bg-gradient-to-br from-primary/5 to-teal-500/5 rounded-lg p-8 border border-primary/20 hover:shadow-lg transition-shadow'>
              <Icon icon={strategy.icon} width={48} height={48} className='text-primary mb-4' />
              <h3 className='text-2xl font-bold mb-3'>{strategy.title}</h3>
              <p className='text-gray-600 dark:text-gray-400 mb-6'>{strategy.description}</p>
              <div className='bg-white dark:bg-dark/50 rounded p-4'>
                <p className='text-sm font-semibold text-teal-600 dark:text-teal-400'>
                  <Icon icon='mdi:check-circle' width={16} height={16} className='inline mr-2' />
                  {strategy.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Benefits */}
        <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='text-center'>
            <Icon icon='mdi:piggy-bank' width={48} height={48} className='text-primary mx-auto mb-4' />
            <h4 className='font-bold mb-2'>Build Equity</h4>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>
              Every payment builds ownership in your property
            </p>
          </div>
          <div className='text-center'>
            <Icon icon='mdi:chart-line' width={48} height={48} className='text-primary mx-auto mb-4' />
            <h4 className='font-bold mb-2'>Property Appreciation</h4>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>
              Invest in high-growth areas with strong market fundamentals
            </p>
          </div>
          <div className='text-center'>
            <Icon icon='mdi:cash-multiple' width={48} height={48} className='text-primary mx-auto mb-4' />
            <h4 className='font-bold mb-2'>Rental Income</h4>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>
              Generate passive income through strategic property features
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
