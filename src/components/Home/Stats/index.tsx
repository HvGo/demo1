import { getSiteSectionByKey } from "@/lib/queries/content";
import { Icon } from "@iconify/react";

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
          <div className="space-y-4">
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5">
              <Icon icon="ph:chart-bar-fill" className="text-2xl text-primary" />
              {badge}
            </p>
            <h2 className="lg:text-52 text-40 font-medium leading-[1.2] text-dark dark:text-white">
              {description}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800/50 border border-dark/5 dark:border-white/5 rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition duration-300"
              >
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3">
                  {stat.value}
                </h3>
                <p className="text-sm sm:text-base text-dark/70 dark:text-white/70 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
