import { Icon } from "@iconify/react/dist/iconify.js";
import { getSiteSectionByKey } from "@/lib/queries/content";

interface Service {
  icon: string;
  title: string;
  subtitle?: string;
  description: string;
  features?: string[];
}

const Services = async () => {
  // Nota: este componente corresponde a la sección `home_services` (o alias `home_categories`)
  const section = await getSiteSectionByKey('home_services')

  if (section && section.isVisible === false) return null

  const badge = section?.title || 'Services'
  const title = section?.subtitle || 'Expert Services for Your Real Estate Journey'
  const description = section?.description || 'Comprehensive solutions tailored to your needs'
  
  // Datos por defecto si no hay en BD
  const defaultServices: Service[] = [
    {
      icon: 'ph:house-simple-fill',
      title: 'First Time BuyersSS',
      description: 'SSSStep-by-step guidance + support navigating Utah Housing programs and grants.'
    },
    {
      icon: 'ph:currency-dollar-fill',
      title: 'Home Sellers',
      description: 'Pricing, marketing, and negotiation to help maximize your equity.'
    },
    {
      icon: 'ph:chart-line-up-fill',
      title: 'Real Estate Investors',
      description: 'Strategy + deal analysis to grow your portfolio with clarity.'
    },
    {
      icon: 'ph:globe-fill',
      title: 'Bilingual Representation',
      description: 'Clear communication in Spanish and English — no confusion, no pressure.'
    }
  ]
  
  // Obtener servicios de contentData o usar array por defecto
  const services: Service[] = Array.isArray(section?.contentData?.services) ? section.contentData.services : defaultServices

  return (
    <section className='py-16 md:py-24 bg-gray-50 dark:bg-dark/50'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>{title}</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            {description}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {services.map((service: any, index: number) => (
            <div key={index} className='bg-white dark:bg-dark rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden'>
              <div className='p-6 text-white' style={{ backgroundImage: 'linear-gradient(to right, #febc59, #273ba8)' }}>
                <Icon icon={service.icon || 'mdi:home-outline'} width={40} height={40} className='mb-4' />
                <h3 className='text-2xl font-bold mb-2'>{service.title}</h3>
                <p className='text-sm font-semibold opacity-90'>{service.subtitle || ''}</p>
              </div>
              <div className='p-6'>
                <p className='text-gray-600 dark:text-gray-400 mb-6'>{service.description}</p>
                <ul className='space-y-3'>
                  {(Array.isArray(service.features) ? service.features : []).map((feature: string, idx: number) => (
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
  );
};

export default Services;
