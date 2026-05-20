import { Icon } from '@iconify/react';
import Image from 'next/image';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import FAQsPageClient from './FAQsPageClient';
import FAQsHeroSection from '@/components/FAQs/HeroSection';

import { getFaqs, getSiteSectionByKey } from '@/lib/queries/content';

export const metadata = {
  title: 'FAQs - Real Estate Questions Answered',
  description: 'Find answers to frequently asked questions about buying, selling, and investing in real estate.',
};

const FAQsPage = async () => {
    const section = await getSiteSectionByKey('home_faqs');
    const faqs = await getFaqs('faqs');
    
    const title = section?.title || 'FAQs';
    const subtitle = section?.subtitle || 'Everything about Real Estate';
    const description = section?.description || 'We know that buying, selling, or investing in real estate can be overwhelming. Here are some frequently asked questions to help guide you through the process';
    
    return (
        <>
            <FAQsHeroSection title={title} subtitle={subtitle} description={description} />

            <FAQsPageClient faqs={faqs} />
        </>
    );
};

export default FAQsPage;
