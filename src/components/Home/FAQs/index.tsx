import { Icon } from '@iconify/react';
import Image from 'next/image';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { getFaqs } from '@/lib/queries/content';

const FAQ = async () => {
    const faqs = await getFaqs('home');
    return (
        <section id='faqs'>
            <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
                <div className="grid lg:grid-cols-2 gap-10 ">
                    <div className='lg:mx-0 mx-auto'>
                        <Image
                            src="/images/faqs/faq-image.png"
                            alt='image'
                            width={680}
                            height={644}
                            className='lg:w-full'
                            unoptimized={true}
                        />
                    </div>
                    <div className='lg:px-12'>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                            <Icon icon="ph:house-simple-fill" className="text-2xl text-primary " />
                            FAQs
                        </p>
                        <h2 className='lg:text-52 text-40 leading-[1.2] font-medium text-dark dark:text-white'>
                            Everything about Homely homes
                        </h2>
                        <p className='text-dark/50 dark:text-white/50 pr-20'>
                            We know that buying, selling, or investing in real estate can be overwhelming. Here are some frequently asked questions to help guide you through the process
                        </p>
                        <div className="my-8">
                            <Accordion
                                type="single"
                                defaultValue={faqs[0] ? `item-0` : undefined}
                                collapsible
                                className="w-full flex flex-col gap-6"
                            >
                                {faqs.map((f, idx) => (
                                    <AccordionItem key={idx} value={`item-${idx}`}>
                                        <AccordionTrigger>{`${idx + 1}. ${f.question}`}</AccordionTrigger>
                                        <AccordionContent>{f.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
