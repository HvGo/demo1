import Image from "next/image";
import Link from "next/link";
import { featuredProprty } from "@/app/api/featuredproperty";
import { Icon } from "@iconify/react";
import { getSiteSectionByKey } from "@/lib/queries/content";
import FeaturedPropertyClient from "./FeaturedPropertyClient";

const FeaturedProperty = async () => {
  const section = await getSiteSectionByKey('home_featured_property');

  if (section && section.isVisible === false) return null;

  const badge = section?.title || 'Featured property';
  const title = section?.subtitle || 'Modern luxe villa';
  const description = section?.description || 'Experience luxury living at modern luxe villa, located at 20 S Aurora Ave, Miami. Priced at $1,650,500, this 560 ft² smart home offers 4 bedrooms, 3 bathrooms, and spacious living areas. Enjoy energy efficiency, natural light, security systems, outdoor spaces, and 2 bar areas—perfect for 8+ guests. Built in 2025.';
  const ctaLabel = section?.primaryCtaLabel || 'Get in touch';
  const ctaHref = section?.primaryCtaHref || '/contactus';

  return (
    <section>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="grid lg:grid-cols-2 gap-10">
          <FeaturedPropertyClient properties={featuredProprty} />
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                <Icon icon="ph:house-simple-fill" className="text-2xl text-primary " />
                {badge}
              </p>
              <h2 className="lg:text-52 text-40 font-medium text-dark dark:text-white">
                {title}
              </h2>
              <div className="flex items-center gap-2.5">
                <Icon icon="ph:map-pin" width={28} height={26} className="text-dark/50 dark:text-white/50" />
                <p className="text-dark/50 dark:text-white/50 text-base">
                  20 S Aurora Ave, Miami
                </p>
              </div>
            </div>
            <p className="text-base text-dark/50 dark:text-white/50">
              {description}
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex items-center gap-4">
                <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
                  <Image
                    src={'/images/hero/sofa.svg'}
                    alt='sofa'
                    width={24}
                    height={24}
                    className='block dark:hidden'
                    unoptimized={true}
                  />
                  <Image
                    src={'/images/hero/dark-sofa.svg'}
                    alt='sofa'
                    width={24}
                    height={24}
                    className='hidden dark:block'
                    unoptimized={true}
                  />
                </div>
                <h6 className="">4 Bedrooms</h6>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
                  <Image
                    src={'/images/hero/tube.svg'}
                    alt='tube'
                    width={24}
                    height={24}
                    className='block dark:hidden'
                    unoptimized={true}
                  />
                  <Image
                    src={'/images/hero/dark-tube.svg'}
                    alt='tube'
                    width={24}
                    height={24}
                    className='hidden dark:block'
                    unoptimized={true}
                  />
                </div>
                <h6 className="">3 Bathrooms</h6>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
                  <Image
                    src={'/images/hero/parking.svg'}
                    alt='parking'
                    width={24}
                    height={24}
                    className='block dark:hidden'
                    unoptimized={true}
                  />
                  <Image
                    src={'/images/hero/dark-parking.svg'}
                    alt='parking'
                    width={24}
                    height={24}
                    className='hidden dark:block'
                    unoptimized={true}
                  />
                </div>
                <h6 className="">Parking Space</h6>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-dark/5 dark:bg-white/5 p-2.5 rounded-[6px]">
                  <Image
                    src={'/images/hero/bar.svg'}
                    alt='bar'
                    width={24}
                    height={24}
                    className='block dark:hidden'
                    unoptimized={true}
                  />
                  <Image
                    src={'/images/hero/dark-bar.svg'}
                    alt='bar'
                    width={24}
                    height={24}
                    className='hidden dark:block'
                    unoptimized={true}
                  />
                </div>
                <h6 className="">2 Bar areas</h6>
              </div>
            </div>
            <div className="flex gap-10">
              <Link href={ctaHref} className="py-4 px-8 bg-primary hover:bg-dark duration-300 rounded-full text-white">
                {ctaLabel}
              </Link>
              <div>
                <h4 className="text-3xl text-dark dark:text-white font-medium">
                  $1,650,500
                </h4>
                <p className="text-base text-dark/50">
                  Discounted price
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperty;
