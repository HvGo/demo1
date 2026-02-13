import { getSiteSectionByKey } from "@/lib/queries/content";
import { Icon } from "@iconify/react";

interface Service {
  icon: string;
  title: string;
  description: string;
}

const HowIHelp = async () => {
  const section = await getSiteSectionByKey('home_how_i_help');

  if (section && section.isVisible === false) return null;

  const badge = section?.title || 'Services';
  const title = section?.subtitle || 'How I Help My Clients';
  const description = section?.description || 'Bilingual expertise, clear strategy, and the confidence to move forward — whether you\'re buying your first home, selling, or investing.';

  const services: Service[] = [
    {
      icon: 'ph:house-simple-fill',
      title: 'First Time Buyers',
      description: 'Step-by-step guidance + support navigating Utah Housing programs and grants.'
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
  ];

  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5">
              <Icon icon="ph:handshake-fill" className="text-2xl text-primary" />
              {badge}
            </p>
            <h2 className="lg:text-52 text-40 font-medium leading-[1.2] text-dark dark:text-white">
              {title}
            </h2>
            <p className="text-dark/50 dark:text-white/50">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition duration-300 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <Icon
                      icon={service.icon}
                      width={24}
                      height={24}
                      className="text-primary sm:w-7 sm:h-7"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-dark dark:text-white">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-dark/70 dark:text-white/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIHelp;
