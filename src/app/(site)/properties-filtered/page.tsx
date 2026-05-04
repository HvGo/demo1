import HeroSub from "@/components/shared/HeroSub";
import PropertiesFilteredListing from "@/components/Properties/PropertiesFilteredListing";
import React from "react";
import { Metadata } from "next";
import { FloatingBubbles } from "@/components/Home/FloatingBubbles";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Search Properties | Homely",
    description: "Search and filter properties by address and type",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Find Your Perfect Property"
                description="Search through our extensive collection of properties with advanced filters."
                badge="Search Properties"
            />
            <PropertiesFilteredListing />
            <FloatingBubbles />
        </>
    );
};

export default page;
