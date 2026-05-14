import HeroSub from "@/components/shared/HeroSub";
import React from "react";
import { Metadata } from "next";
import { FloatingBubbles } from "@/components/Home/FloatingBubbles";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Search Properties | IDX Broker",
    description: "Search and filter properties using our advanced IDX Broker widget.",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Find Your Perfect Property"
                description="Search through our extensive collection of properties with advanced filters."
                badge="Search Properties"
            />
            <section className="py-8 bg-white dark:bg-dark">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                    {/* IDX Broker Widget - Archived */}
                </div>
            </section>
            <FloatingBubbles />
        </>
    );
};

export default page;
