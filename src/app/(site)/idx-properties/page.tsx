import HeroSub from "@/components/shared/HeroSub";
import IDXPropertiesEmbed from "@/components/Properties/IDXPropertiesEmbed";
import React from "react";
import { Metadata } from "next";
import { FloatingBubbles } from "@/components/Home/FloatingBubbles";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Properties | Ivan Utah Realtor",
    description: "Browse all available properties with our advanced search and filtering options.",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Browse Properties"
                description="Explore our complete property listings with advanced search and filtering."
                badge="All Properties"
            />
            <section className="py-8 bg-white dark:bg-dark min-h-screen">
                <div className="w-full">
                    <IDXPropertiesEmbed />
                </div>
            </section>
            <FloatingBubbles />
        </>
    );
};

export default page;
