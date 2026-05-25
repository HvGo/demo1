import HeroSub from "@/components/shared/HeroSub";
import IDXPropertiesEmbedCity from "@/components/Properties/IDXPropertiesEmbedCity";
import React from "react";
import { Metadata } from "next";
import { FloatingBubbles } from "@/components/Home/FloatingBubbles";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Properties in Tooele & Stansbury Park | Ivan Utah Realtor",
    description: "Browse available properties in Tooele and Stansbury Park with our advanced search and filtering options.",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Properties in Tooele & Stansbury Park"
                description="Explore our complete property listings in Tooele and Stansbury Park with advanced search and filtering."
                badge="Tooele & Stansbury Park"
            />
            <section className="py-8 bg-white dark:bg-dark min-h-screen" style={{ paddingTop: "0px" }}>
                <div className="w-full">
                    <IDXPropertiesEmbedCity 
                        cityUrl="https://ivanutahrealtor.idxbroker.com/i/tooele-stansbury"
                        cityName="Tooele & Stansbury Park"
                    />
                </div>
            </section>
            <FloatingBubbles />
        </>
    );
};

export default page;
