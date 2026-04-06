'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FAQsClientProps {
  children: React.ReactNode;
}

export default function FAQsClient({ children }: FAQsClientProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s ease-out',
      }}
    >
      {children}
    </div>
  );
}
