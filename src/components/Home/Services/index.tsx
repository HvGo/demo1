import { Icon } from "@iconify/react/dist/iconify.js";
import { getSiteSectionByKey } from "@/lib/queries/content";
import ServicesClient from "./ServicesClient";

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

        <ServicesClient 
          title={title}
          description={description}
          services={services}
        />
      </div>
    </section>
  );
};

export default Services;
