import { getSiteSectionByKey } from "@/lib/queries/content";
import { Icon } from "@iconify/react";
import Link from "next/link";
import StatsClient from "./StatsClient";

interface Stat {
  value: string;
  label: string;
}

const Stats = async () => {
  const section = await getSiteSectionByKey('home_stats');

  if (section && section.isVisible === false) return null;

  const badge = section?.title || 'Statistics';
  const description = section?.description || 'Our track record speaks for itself';

  // Datos dinámicos desde BD - se leen del campo content_data (JSONB)
  // Si no existen datos en BD, se usan valores por defecto
  const defaultStats: Stat[] = [
    {
      value: '22+',
      label: 'Years Experience'
    },
    {
      value: '1,100',
      label: 'Families Served'
    },
    {
      value: 'Top 500',
      label: 'Salt Lake City Realtor'
    },
    {
      value: 'Bilingual',
      label: 'Spanish & English'
    }
  ];

  // Leer datos dinámicos desde content_data (JSONB en BD)
  let stats: Stat[] = defaultStats;
  if (section?.contentData && Array.isArray(section.contentData)) {
    stats = section.contentData as Stat[];
  }

  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 justify-center">
              <Icon icon="ph:chart-bar-fill" className="text-2xl text-primary" />
              {badge}
            </p>
            <h2 className="lg:text-52 text-40 font-medium leading-[1.2] text-dark dark:text-white">
              {description}
            </h2>
          </div>

          <StatsClient stats={stats} />

          <div className="flex justify-center mt-12">
            <Link
              href="/contactus"
              className='px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:cursor-pointer flex items-center justify-center gap-2 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 transition-colors whitespace-nowrap' style={{ backgroundColor: 'rgba(0, 168, 107, 1)' }}>
              <Icon icon="mdi:phone" width={20} height={20} />
              Let&apos;s talk with Ivan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
