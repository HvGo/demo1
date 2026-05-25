import HeroSub from "@/components/shared/HeroSub";
import IDXPropertiesEmbedCity from "@/components/Properties/IDXPropertiesEmbedCity";
import React from "react";
import { Metadata } from "next";
import { FloatingBubbles } from "@/components/Home/FloatingBubbles";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Properties in Lehi & Saratoga Springs | Ivan Utah Realtor",
    description: "Browse available properties in Lehi and Saratoga Springs with our advanced search and filtering options.",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Properties in Lehi & Saratoga Springs"
                description="Explore our complete property listings in Lehi and Saratoga Springs with advanced search and filtering."
                badge="Lehi & Saratoga Springs"
            />
            <section className="py-8 bg-white dark:bg-dark min-h-screen" style={{ paddingTop: "0px" }}>
                <div className="w-full">
                    <IDXPropertiesEmbedCity 
                        cityUrl="https://ivanutahrealtor.idxbroker.com/i/lehi-saratoga"
                        cityName="Lehi & Saratoga Springs"
                    />
                </div>
            </section>
            <FloatingBubbles />
        </>
    );
};

export default page;
