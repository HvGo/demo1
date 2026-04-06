'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Stat {
  value: string;
  label: string;
}

interface StatsClientProps {
  stats: Stat[];
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.8s ease-out ${index * 0.1}s`,
        border: '1px solid rgba(0, 168, 107, 0.2)',
        borderRadius: '1rem',
        padding: '1.5rem',
        textAlign: 'center',
        backgroundColor: 'rgba(47, 61, 178, 1)',
      }}
    >
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" style={{ color: 'rgba(254, 188, 89, 1)' }}>
        {stat.value}
      </h3>
      <p className="text-sm sm:text-base font-medium" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsClient({ stats }: StatsClientProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {stats.map((stat: Stat, index: number) => (
        <StatCard key={index} stat={stat} index={index} />
      ))}
    </div>
  );
}
