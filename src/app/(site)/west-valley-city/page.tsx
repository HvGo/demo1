import HeroSub from "@/components/shared/HeroSub";
import IDXWidgetEmbed from "@/components/Properties/IDXWidgetEmbed";
import React from "react";
import { Metadata } from "next";
import { FloatingBubbles } from "@/components/Home/FloatingBubbles";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Properties in West Valley City | Ivan Utah Realtor",
    description: "Browse available properties in West Valley City with our advanced search and filtering options.",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Properties in West Valley City"
                description="Explore our complete property listings in West Valley City with advanced search and filtering."
                badge="West Valley City"
            />
            <section className="py-8 bg-white dark:bg-dark min-h-screen" style={{ paddingTop: "0px" }}>
                <div className="w-full">
                    <IDXWidgetEmbed 
                        widgetId="168391"
                        cityName="West Valley City"
                    />
                </div>
            </section>
            <FloatingBubbles />
        </>
    );
};

export default page;
