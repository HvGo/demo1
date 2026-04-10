import { Icon } from '@iconify/react';
import Image from 'next/image';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import FAQsPageClient from './FAQsPageClient';

import { getFaqs, getSiteSectionByKey } from '@/lib/queries/content';

export const metadata = {
  title: 'FAQs - Real Estate Questions Answered',
  description: 'Find answers to frequently asked questions about buying, selling, and investing in real estate.',
};

const FAQsPage = async () => {
    const section = await getSiteSectionByKey('home_faqs');
    const faqs = await getFaqs('home');
    
    const title = section?.title || 'FAQs';
    const subtitle = section?.subtitle || 'Everything about Real Estate';
    const description = section?.description || 'We know that buying, selling, or investing in real estate can be overwhelming. Here are some frequently asked questions to help guide you through the process';
    const imageUrl = '/images/faqs/imgfaqs2.png?v=' + Date.now();
    
    return (
        <>
            <section className='py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark/50 dark:to-dark'>
                <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
                    <div className='text-center mb-12 md:mb-16'>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2 justify-center">
                            <Icon icon="ph:question-fill" className="text-2xl text-primary" />
                            {title}
                        </p>
                        <h1 className='text-4xl md:text-5xl font-bold mb-4 text-dark dark:text-white'>
                            {subtitle}
                        </h1>
                        <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                            {description}
                        </p>
                    </div>
                </div>
            </section>

            <FAQsPageClient faqs={faqs} imageUrl={imageUrl} />
        </>
    );
};

export default FAQsPage;
