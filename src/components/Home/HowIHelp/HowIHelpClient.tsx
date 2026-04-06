'use client'

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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

interface HowIHelpClientProps {
  services: Service[];
}

function HowIHelpCard({ service, index }: { service: Service; index: number }) {
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
        <div className='p-6 text-white' style={{ backgroundImage: 'linear-gradient(to right, #273ba8, #febc59 )' }}>
          <h3 className='text-2xl font-bold mb-2'>{service.title}</h3>
          <p className='text-sm font-semibold opacity-90'>{service.subtitle || service.description}</p>
        </div>
        <div className='p-6'>
          <ul className='space-y-3'>
            {(Array.isArray(service.features) ? service.features : []).map((feature: string, idx: number) => (
              <li key={idx} className='flex items-start gap-3'>
                <Icon icon='mdi:check-circle' width={20} height={20} className='text-teal-500 flex-shrink-0 mt-0.5' />
                <span className='text-sm'>{feature}</span>
              </li>
            ))}
          </ul>
          {service.showButton && service.buttonHref && service.buttonLabel && (
            <Link
              href={service.buttonHref}
              className='inline-block mt-6 px-6 py-2 rounded-lg font-semibold text-white transition-colors'
              style={{ backgroundColor: '#00A86B' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#008C5A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00A86B'}
            >
              {service.buttonLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HowIHelpClient({ services }: HowIHelpClientProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
      {services.map((service: Service, index: number) => (
        <HowIHelpCard key={index} service={service} index={index} />
      ))}
    </div>
  );
}
