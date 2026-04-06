'use client'

import Image from 'next/image';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FAQ {
    id: string;
    question: string;
    answer: string;
}

interface FAQsPageClientProps {
    faqs: FAQ[];
    imageUrl: string;
}

export default function FAQsPageClient({ faqs, imageUrl }: FAQsPageClientProps) {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

    return (
        <section className='py-16 md:py-24 bg-white dark:bg-dark'>
            <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
                <div className="grid lg:grid-cols-2 gap-10">
                    <div 
                        ref={ref}
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                            transition: 'all 0.8s ease-out',
                        }}
                        className='lg:mx-0 mx-auto'
                    >
                        <Image
                            src={imageUrl}
                            alt='faq image'
                            width={680}
                            height={644}
                            className='lg:w-full rounded-lg'
                            unoptimized={true}
                        />
                    </div>
                    <div className='lg:px-12'>
                        <h2 className='lg:text-4xl text-3xl leading-[1.2] font-bold text-dark dark:text-white mb-8'>
                            Frequently Asked Questions
                        </h2>
                        <div className="my-8">
                            <Accordion
                                type="single"
                                defaultValue={faqs[0] ? `item-0` : undefined}
                                collapsible
                                className="w-full flex flex-col gap-4"
                            >
                                {faqs.map((f, idx) => (
                                    <AccordionItem key={idx} value={`item-${idx}`} className="border border-gray-200 dark:border-gray-700 rounded-lg px-4">
                                        <AccordionTrigger className="text-left font-semibold text-dark dark:text-white hover:text-primary dark:hover:text-primary">
                                            {`${idx + 1}. ${f.question}`}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 dark:text-gray-400">
                                            {f.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
