import HeroSub from "@/components/shared/HeroSub";
import IDXPropertiesEmbedCity from "@/components/Properties/IDXPropertiesEmbedCity";
import React from "react";
import { Metadata } from "next";
import { FloatingBubbles } from "@/components/Home/FloatingBubbles";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Properties in Kearns & Magna | Ivan Utah Realtor",
    description: "Browse available properties in Kearns and Magna with our advanced search and filtering options.",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Properties in Kearns & Magna"
                description="Explore our complete property listings in Kearns and Magna with advanced search and filtering."
                badge="Kearns & Magna"
            />
            <section className="py-8 bg-white dark:bg-dark min-h-screen" style={{ paddingTop: "0px" }}>
                <div className="w-full">
                    <IDXPropertiesEmbedCity 
                        cityUrl="https://ivanutahrealtor.idxbroker.com/i/kearns-magna"
                        cityName="Kearns & Magna"
                    />
                </div>
            </section>
            <FloatingBubbles />
        </>
    );
};

export default page;
