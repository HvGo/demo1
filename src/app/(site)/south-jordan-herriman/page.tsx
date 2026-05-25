import HeroSub from "@/components/shared/HeroSub";
import IDXPropertiesEmbedCity from "@/components/Properties/IDXPropertiesEmbedCity";
import React from "react";
import { Metadata } from "next";
import { FloatingBubbles } from "@/components/Home/FloatingBubbles";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Properties in South Jordan & Herriman | Ivan Utah Realtor",
    description: "Browse available properties in South Jordan and Herriman with our advanced search and filtering options.",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Properties in South Jordan & Herriman"
                description="Explore our complete property listings in South Jordan and Herriman with advanced search and filtering."
                badge="South Jordan & Herriman"
            />
            <section className="py-8 bg-white dark:bg-dark min-h-screen" style={{ paddingTop: "0px" }}>
                <div className="w-full">
                    <IDXPropertiesEmbedCity 
                        cityUrl="https://ivanutahrealtor.idxbroker.com/i/herriman-sjordan"
                        cityName="South Jordan & Herriman"
                    />
                </div>
            </section>
            <FloatingBubbles />
        </>
    );
};

export default page;
