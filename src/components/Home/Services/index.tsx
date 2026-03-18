import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

import { getSiteSectionByKey } from "@/lib/queries/content";

const Categories = async () => {
  const section = await getSiteSectionByKey('home_categories')

  if (section && section.isVisible === false) return null

  const badge = section?.title || 'Categories'
  const title = section?.subtitle || 'Explore best properties\nwith expert services.'
  const description = section?.description || 'Discover a diverse range of premium properties, from luxurious apartments to spacious villas, tailored to your needs'
  const ctaLabel = section?.primaryCtaLabel || 'View properties'
  const ctaHref = section?.primaryCtaHref || '/properties'

  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 justify-center">
              <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
              {badge}
            </p>
            <h2 className="lg:text-52 text-40 font-medium leading-[1.2] text-dark dark:text-white">
              {title}
            </h2>
            <p className="text-dark/50 dark:text-white/50 text-base sm:text-lg leading-[1.3]">
              {description}
            </p>
          </div>
          <div className="flex justify-center">
            <Link href={ctaHref} className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
