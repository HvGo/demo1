import HeroSub from "@/components/shared/HeroSub";
import FeaturedListingsClient from "@/components/FeaturedListings/FeaturedListingsClient";
import React from "react";
import { Metadata } from "next";
import { FloatingBubbles } from "@/components/Home/FloatingBubbles";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Featured Listings | Ivan Utah Realtor",
    description: "Browse our featured properties with advanced filters by price and bedrooms.",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Featured Properties"
                description="Explore our handpicked featured listings with detailed information and filters."
                badge="Featured Listings"
            />
            <section className="py-16 md:py-24 bg-white dark:bg-dark">
                <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                    <FeaturedListingsClient />
                </div>
            </section>
            <FloatingBubbles />
        </>
    );
};

export default page;
