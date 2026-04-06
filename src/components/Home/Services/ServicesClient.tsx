'use client'

import { Icon } from "@iconify/react/dist/iconify.js";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Service {
  icon: string;
  title: string;
  subtitle?: string;
  description: string;
  features?: string[];
}

interface ServicesClientProps {
  title: string;
  description: string;
  services: Service[];
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div 
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.8s ease-out ${index * 0.1}s`,
      }}
    >
      <div className='bg-white dark:bg-dark rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden h-full'>
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
    </div>
  );
}

export default function ServicesClient({ title, description, services }: ServicesClientProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
      {services.map((service: any, index: number) => (
        <ServiceCard key={index} service={service} index={index} />
      ))}
    </div>
  );
}
