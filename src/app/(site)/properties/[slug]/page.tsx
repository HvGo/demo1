import React from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';
import { getPropertyDetailBySlug } from '@/lib/queries/content';

export default async function Details({ params }: any) {
    const data = await params;
    const item = await getPropertyDetailBySlug(data.slug);
    if (!item) {
        return null;
    }
    return (
        <section className="!pt-44 pb-20 relative" >
            <div className="container mx-auto max-w-8xl px-5 2xl:px-0">
                <div className="grid grid-cols-12 items-end gap-6">
                    <div className="lg:col-span-8 col-span-12">
                        <div className="flex items-center gap-4 flex-wrap">
                            <h1 className='lg:text-52 text-40 font-semibold text-dark dark:text-white'>{item.title}</h1>
                            {item.status && item.status !== 'available' && (
                                <span className="px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                                    {item.status === 'sold' ? 'Sold' : item.status === 'reserved' ? 'Reserved' : item.status}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2.5">
                            <Icon icon="ph:map-pin" width={24} height={24} className="text-dark/50 dark:text-white/50" />
                            <p className='text-dark/50 dark:text-white/50 text-xm'>{item.address}</p>
                        </div>
                    </div>
                    <div className="lg:col-span-4 col-span-12">
                        <div className='flex'>
                            <div className='flex flex-col gap-2 border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8'>
                                <Icon icon={'solar:bed-linear'} width={20} height={20} />
                                <p className='text-sm mobile:text-base font-normal text-black dark:text-white'>
                                    {item.bedrooms} Bedrooms
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8'>
                                <Icon icon={'solar:bath-linear'} width={20} height={20} />
                                <p className='text-sm mobile:text-base font-normal text-black dark:text-white'>
                                    {item.bathrooms} Bathrooms
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 pl-2 xs:pl-4 mobile:pl-8'>
                                <Icon
                                    icon={'lineicons:arrow-all-direction'}
                                    width={20}
                                    height={20}
                                />
                                <p className='text-sm mobile:text-base font-normal text-black dark:text-white'>
                                    {item.area}m<sup>2</sup>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 mt-8 gap-8">
                    <div className="lg:col-span-8 col-span-12 row-span-2">
                        {item.images && item.images[0] && (
                            <div className="">
                                <Image
                                    src={item.images[0]?.src}
                                    alt="Main Property Image"
                                    width={400}
                                    height={500}
                                    className="rounded-2xl w-full h-540"
                                    unoptimized={true}
                                />
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-4 lg:block hidden">
                        {item.images && item.images[1] && (
                            <Image src={item.images[1]?.src} alt="Property Image 2" width={400} height={500} className="rounded-2xl w-full h-full" unoptimized={true} />
                        )}
                    </div>
                    <div className="lg:col-span-2 col-span-6">
                        {item.images && item.images[2] && (
                            <Image src={item.images[2]?.src} alt="Property Image 3" width={400} height={500} className="rounded-2xl w-full h-full" unoptimized={true} />
                        )}
                    </div>
                    <div className="lg:col-span-2 col-span-6">
                        {item.images && item.images[3] && (
                            <Image src={item.images[3]?.src} alt="Property Image 4" width={400} height={500} className="rounded-2xl w-full h-full" unoptimized={true} />
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-8 mt-10">
                    <div className="lg:col-span-8 col-span-12">
                        <h3 className='text-xl font-medium'>Property details</h3>
                        <div className="py-8 my-8 border-y border-dark/10 dark:border-white/20 flex flex-col gap-8">
                            {Array.isArray(item.highlights) && item.highlights.length > 0 ? (
                                item.highlights.map((h: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-6">
                                        <div>
                                            {h.iconImageUrl ? (
                                                <Image src={h.iconImageUrl} width={400} height={500} alt="" className='w-8 h-8 dark:hidden' unoptimized={true} />
                                            ) : null}
                                            {h.iconImageUrlDark ? (
                                                <Image src={h.iconImageUrlDark} width={400} height={500} alt="" className='w-8 h-8 dark:block hidden' unoptimized={true} />
                                            ) : null}
                                        </div>
                                        <div>
                                            <h3 className='text-dark dark:text-white text-xm'>{h.title}</h3>
                                            <p className='text-base text-dark/50 dark:text-white/50'>
                                                {h.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : null}
                        </div>
                        {item.description ? (
                            <div className="flex flex-col gap-5">
                                <p className='text-dark dark:text-white text-xm '>
                                    {item.description}
                                </p>
                            </div>
                        ) : null}
                        <div className="py-8 mt-8 border-t border-dark/5 dark:border-white/15">
                            <h3 className='text-xl font-medium'>What this property offers</h3>
                            <div className="grid grid-cols-3 mt-5 gap-6">
                                {Array.isArray(item.offers) && item.offers.length > 0 ? (
                                    item.offers.map((o: any, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2.5">
                                            {o.icon ? (
                                                <Icon icon={o.icon} width={24} height={24} className="text-dark dark:text-white" />
                                            ) : null}
                                            <p className='text-base dark:text-white text-dark'>{o.label}</p>
                                        </div>
                                    ))
                                ) : null}
                            </div>
                        </div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d938779.7831767448!2d71.05098621661072!3d23.20271516446136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e82dd003ff749%3A0x359e803f537cea25!2sGANESH%20GLORY%2C%20Gota%2C%20Ahmedabad%2C%20Gujarat%20382481!5e0!3m2!1sen!2sin!4v1715676641521!5m2!1sen!2sin"
                            width="1114" height="400" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-2xl w-full">
                        </iframe>
                    </div>
                    <div className="lg:col-span-4 col-span-12">
                        <div className="bg-primary/10 p-8 rounded-2xl relative z-10 overflow-hidden">
                            <h4 className='text-dark text-3xl font-medium dark:text-white'>
                                {item.rate}
                            </h4>
                            <p className='text-sm text-dark/50 dark:text-white'>Discounted Price</p>
                            {item.sellerMessage ? (
                                <p className='text-sm text-dark/50 dark:text-white mt-3'>
                                    {item.sellerMessage}
                                </p>
                            ) : null}
                            <Link href="#" className='py-4 px-8 bg-primary text-white rounded-full w-full block text-center hover:bg-dark duration-300 text-base mt-8 hover:cursor-pointer'>
                                {item.ctaLabel || 'Get in touch'}
                            </Link>
                            <div className="absolute right-0 top-4 -z-[1]">
                                <Image src="/images/properties/vector.svg" width={400} height={500} alt="vector" unoptimized={true} />
                            </div>
                        </div>
                        {item.testimonial ? (
                            <div className="border p-10 rounded-2xl border-dark/10 dark:border-white/20 mt-10 flex flex-col gap-6">
                                <Icon icon="ph:house-simple" width={44} height={44} className="text-primary" />
                                <p className='text-xm text-dark dark:text-white'>{item.testimonial.review}</p>
                                <div className="flex items-center gap-6">
                                    {item.testimonial.image ? (
                                        <Image src={item.testimonial.image} alt={item.testimonial.name} width={400} height={500} className='w-20 h-20 rounded-2xl' unoptimized={true} />
                                    ) : null}
                                    <div className="">
                                        <h3 className='text-xm text-dark dark:text-white'>{item.testimonial.name}</h3>
                                        <h4 className='text-base text-dark/50 dark:text-white/50'>{item.testimonial.position}</h4>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
