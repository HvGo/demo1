import HeroSub from "@/components/shared/HeroSub";
import IDXPropertiesEmbed from "@/components/Properties/IDXPropertiesEmbed";
import React from "react";
import { Metadata } from "next";
import { FloatingBubbles } from "@/components/Home/FloatingBubbles";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Buscar Casas en Utah | Ivan Utah Realtor",
    description: "Busca propiedades disponibles en Utah con nuestro buscador avanzado y opciones de filtrado.",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Buscar Casas en Utah"
                description="Explora nuestro catálogo completo de propiedades con búsqueda avanzada y filtros."
                badge="Todas las Propiedades"
            />
            <section className="py-8 bg-white dark:bg-dark min-h-screen" style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                <div className="w-full">
                    <IDXPropertiesEmbed />
                </div>
            </section>
            <FloatingBubbles />
        </>
    );
};

export default page;
