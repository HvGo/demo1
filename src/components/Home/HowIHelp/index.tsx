import { getSiteSectionByKey } from "@/lib/queries/content";
import HowIHelpClient from "./HowIHelpClient";

interface Service {
  icon: string;
  title: string;
  subtitle?: string;
  description: string;
  features?: string[];
  showButton?: boolean;
  buttonLabel?: string;
  buttonHref?: string;
  buttonIcon?: string | null;
}

const HowIHelp = async () => {
  const section = await getSiteSectionByKey('home_how_i_help');

  if (section && section.isVisible === false) return null;

  const badge = section?.title || 'Services';
  const title = section?.subtitle || 'How I Help My Clients';
  const description = section?.description || 'Bilingual expertise, clear strategy, and the confidence to move forward — whether you\'re buying your first home, selling, or investing.';

  // Datos por defecto como fallback
  const defaultServices: Service[] = [
    {
      icon: 'ph:house-simple-fill',
      title: 'First Time Buyers',
      description: 'Your Path to Ownership.',
      features: [
      'Utah Housing: Specialist in Down Payment Assistance programs and local grants.',
      'Grants & ITIN: Expert guidance on securing funds and navigating ITIN loan strategies.',
      'Step-by-Step: A clear, stress-free education to navigate the Utah market with confidence.'
    ],
      showButton: true,
      buttonLabel: 'Schedule Your Session',
      buttonHref: '#golden-questions',
      buttonIcon: null
    },
    {
      icon: 'ph:currency-dollar-fill',
      title: 'Home Sellers',
      description: 'Maximize Your Profit',
      features: [
      'Equity Focus: Strategic pricing and negotiation to protect and grow your investment.',
      'Market Mastery: A proven 22-year plan to sell your home for the highest possible price.',
      'Expert Advocacy: Leveraging two decades of Wasatch Front experience to manage every detail.'
    ],
      showButton: false
    },
    {
      icon: 'ph:chart-line-up-fill',
      title: 'Real Estate Investors',
      description: 'Build a Legacy',
       features: [
      'Deal Analysis: Real data and clear strategy to grow your rental property portfolio.',
      'Wealth Strategy: Proven methods to build financial freedom across the Wasatch Front.',
      'Portfolio Growth: Strategic planning to turn real estate into a lasting family legacy.'
    ],
      showButton: false
    }
  ];

  // Obtener servicios de contentData o usar array por defecto
  let services: Service[] = defaultServices;
  
  if (section?.contentData) {
    try {
      // Si contentData es string, parsearlo
      const contentData = typeof section.contentData === 'string' 
        ? JSON.parse(section.contentData) 
        : section.contentData;
      
      // Si tiene services array, usarlo
      if (Array.isArray(contentData?.services)) {
        services = contentData.services;
      }
    } catch (e) {
      console.error('Error parsing contentData, using defaults:', e);
      // Si hay error, usa defaultServices
      services = defaultServices;
    }
  }

  return (
    <section className='py-16 md:py-24 bg-gray-50 dark:bg-dark/50'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>{title}</h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            {description}
          </p>
        </div>

        <HowIHelpClient services={services} />
      </div>
    </section>
  );
};

export default HowIHelp;
