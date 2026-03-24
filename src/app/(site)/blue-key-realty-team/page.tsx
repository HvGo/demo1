import Image from "next/image";
import { Icon } from "@iconify/react";
import HeroSub from "@/components/shared/HeroSub";
import { getSchemaMarkupByKey } from "@/lib/queries/schema";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FloatingBubbles } from "@/components/Home/FloatingBubbles";

export default async function BlueKeyRealtyTeam() {
  const personSchema = await getSchemaMarkupByKey('person_ivan')
  const teamMembers = [
    {
      name: "Ivan Navincopa",
      role: "Owner & Principal Broker",
      specialty: "Vision & Strategy",
      image: "/images/team/ivan.jpg"
    },
    {
      name: "Freddy Villanueva",
      role: "Realtor Associate",
      specialty: "Buyer Specialist",
      image: "/images/team/Freddy.png"
    },
    {
      name: "Lissy Quiroz",
      role: "Office Manager",
      specialty: "Operations & Accuracy",
      image: "/images/team/lissy.png"
    },
    {
      name: "Gabi Belisario",
      role: "Marketing Director",
      specialty: "Digital Exposure",
      image: "/images/team/gabi.png"
    }
  ];

  const primaryAreas = [
    "Salt Lake City",
    "West Valley City",
    "Kearns",
    "South Jordan",
    "Herriman",
    "Lehi",
    "Provo",
    "Orem",
    "Ogden",
    "Roy",
    "Layton",
    "Entire Wasatch Front"
  ];

  return (
    <>
      <SchemaMarkup schema={personSchema?.schemaData} />
      <HeroSub
        title="The Blue Key Realty Team"
        description="Professional. Bilingual. Infrastructure-Driven. A 22-year legacy built on a strong foundation."
        badge="Our Team"
      />

      <main className="bg-white dark:bg-dark">
      {/* About Section */}
      <section className="py-8 md:py-12">
        <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-dark dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-primary mb-1">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.specialty}
                </p>
              </div>
            ))}
          </div>

          {/* About Text Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              A 22-year legacy is built on a strong foundation. Our team ensures that every transaction 
              is handled with executive-level precision.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <Icon icon="mdi:check-circle" width={24} height={24} />
              <span>Ready to build your strategy? Let&apos;s talk.</span>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-gray-50 dark:bg-dark/50 rounded-lg p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-dark dark:text-white mb-6 text-center">
              Service Areas
            </h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
                Serving Salt Lake, Utah, Davis, Weber, and Tooele Counties.
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Primary Areas:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {primaryAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Icon icon="mdi:map-marker" width={20} height={20} className="text-primary flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              Ready to work with our team?
            </p>
            <a
              href="/contactus"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
            >
              <Icon icon="mdi:phone" width={20} height={20} />
              Let&apos;s chat with Ivan
            </a>
          </div>
        </div>
      </section>
      </main>
      <FloatingBubbles />
    </>
  );
}
