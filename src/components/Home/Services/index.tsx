import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

import { getSiteSectionByKey } from "@/lib/queries/content";

const Categories = async () => {
  const section = await getSiteSectionByKey('home_categories')

  const badge = section?.title || 'Categories'
  const title = section?.subtitle || 'Explore best properties\nwith expert services.'
  const description = section?.description || 'Discover a diverse range of premium properties, from luxurious apartments  to spacious villas, tailored to your needs'
  const ctaLabel = section?.primaryCtaLabel || 'View properties'
  const ctaHref = section?.primaryCtaHref || '/properties'

  if (section && section.isVisible === false) return null

  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-0 top-0">
        <Image
          src="/images/categories/Vector.svg"
          alt="vector"
          width={800}
          height={1050}
          className="dark:hidden"
          unoptimized={true}
        />
        <Image
          src="/images/categories/Vector-dark.svg"
          alt="vector"
          width={800}
          height={1050}
          className="hidden dark:block"
          unoptimized={true}
        />
      </div>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0 relative z-10">
        <div className="grid grid-cols-12 items-center gap-5 md:gap-10">
          <div className="lg:col-span-6 col-span-12">
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5">
              <Icon icon="ph:house-simple-fill" className="text-2xl text-primary " />
              {badge}
            </p>
            <h2 className="lg:text-52 text-3xl sm:text-40 mt-4 mb-2 lg:max-w-full font-medium leading-[1.2] text-dark dark:text-white">
              {title}
            </h2>
            <p className="text-dark/50 dark:text-white/50 text-base sm:text-lg lg:max-w-full leading-[1.3] md:max-w-3/4">
              {description}
            </p>
            <Link href={ctaHref} className="py-4 px-8 bg-primary text-base leading-4 block w-fit text-white rounded-full font-semibold mt-8 hover:bg-dark duration-300">
              {ctaLabel}
            </Link>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="relative rounded-2xl overflow-hidden group">
              <Link href="/residential-homes">
                <Image
                  src="/images/categories/villas.jpg"
                  alt="villas"
                  width={680}
                  height={386}
                  className="w-full"
                  unoptimized={true}
                />
              </Link>
              <Link href="/residential-homes" className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-5 sm:pl-10 pb-5 sm:pb-10 group-hover:top-0 duration-500">
                <div className="flex justify-end mt-4 sm:mt-6 mr-4 sm:mr-6">
                  <div className="bg-white text-dark rounded-full w-fit p-2 sm:p-4">
                    <Icon icon="ph:arrow-right" width={20} height={20} className="sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-lg sm:text-2xl line-clamp-2">
                    Residential Homes
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-5 sm:leading-6 line-clamp-3">
                    Experience elegance and comfort with our exclusive luxury villas, designed  for sophisticated living.
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="relative rounded-2xl overflow-hidden group">
              <Link href="/luxury-villa">
                <Image
                  src="/images/categories/luxury-villa.jpg"
                  alt="villas"
                  width={680}
                  height={386}
                  className="w-full"
                  unoptimized={true}
                />
              </Link>
              <Link href="/luxury-villa" className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-5 sm:pl-10 pb-5 sm:pb-10 group-hover:top-0 duration-500">
                <div className="flex justify-end mt-4 sm:mt-6 mr-4 sm:mr-6">
                  <div className="bg-white text-dark rounded-full w-fit p-2 sm:p-4">
                    <Icon icon="ph:arrow-right" width={20} height={20} className="sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-lg sm:text-2xl line-clamp-2">
                    Luxury villas
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-5 sm:leading-6 line-clamp-3">
                    Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-3 col-span-12 sm:col-span-6">
            <div className="relative rounded-2xl overflow-hidden group">
              <Link href="/appartment">
                <Image
                  src="/images/categories/appartment.jpg"
                  alt="villas"
                  width={320}
                  height={386}
                  className="w-full"
                  unoptimized={true}
                />
              </Link>
              <Link href="/appartment" className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-5 sm:pl-10 pb-5 sm:pb-10 group-hover:top-0 duration-500">
                <div className="flex justify-end mt-4 sm:mt-6 mr-4 sm:mr-6">
                  <div className="bg-white text-dark rounded-full w-fit p-2 sm:p-4">
                    <Icon icon="ph:arrow-right" width={20} height={20} className="sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-lg sm:text-2xl line-clamp-2">
                    Appartment
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-5 sm:leading-6 line-clamp-3">
                    Experience elegance and comfort with our exclusive luxury villas, designed  for sophisticated living.
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-3 col-span-12 sm:col-span-6">
            <div className="relative rounded-2xl overflow-hidden group">
              <Link href="/office-spaces">
                <Image
                  src="/images/categories/office.jpg"
                  alt="office"
                  width={320}
                  height={386}
                  className="w-full"
                  unoptimized={true}
                />
              </Link>
              <Link href="/office-spaces" className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-5 sm:pl-10 pb-5 sm:pb-10 group-hover:top-0 duration-500">
                <div className="flex justify-end mt-4 sm:mt-6 mr-4 sm:mr-6">
                  <div className="bg-white text-dark rounded-full w-fit p-2 sm:p-4">
                    <Icon icon="ph:arrow-right" width={20} height={20} className="sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-lg sm:text-2xl line-clamp-2">
                    Office Spaces
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-5 sm:leading-6 line-clamp-3">
                    Experience elegance and comfort with our exclusive luxury villas, designed  for sophisticated living.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
