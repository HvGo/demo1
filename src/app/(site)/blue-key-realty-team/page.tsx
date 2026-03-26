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
      image: "/images/team/ivan.png"
    },
    {
      name: "Freddy Villanueva",
      role: "Realtor Associate",
      specialty: "Buyer Specialist",
      image: "/images/team/freddy.png"
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
        title="Our Mission"    //"The Blue Key Realty Team"
        description="At Blue Key Realty, our mission is simple: to guide families through every step of buying or selling a home with confidence and clarity."
        badge="Our Mission"
      />

      <main className="bg-white dark:bg-dark">
      {/* Mission Section */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-dark/50">
        <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

            {/* Content */}
            <div className="order-2 lg:order-1">
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  With over 22 years of experience and $150 million in closed sales, we&apos;ve helped more than 1,100 Utah families achieve their real estate goals. As a Utah Top 500 Realtor and proud member of NAHREP, our success comes from combining market expertise, strong negotiation skills, and a genuine care for people.
                </p>

                <p>
                  We are a bilingual, community-driven team serving Salt Lake, Utah, Davis, Weber, and Tooele Counties. We specialize in:
                </p>

                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <Icon icon="mdi:check-circle" width={20} height={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>First-time homebuyers (including ITIN solutions)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon icon="mdi:check-circle" width={20} height={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>New-construction and move-up homes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon icon="mdi:check-circle" width={20} height={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Sellers ready to maximize their return</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon icon="mdi:check-circle" width={20} height={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Investors building long-term wealth</span>
                  </li>
                </ul>

                <p>
                  We believe education empowers clients to make smart, informed decisions—because when you understand the process, every move feels right. Whether you&apos;re buying your first home, selling, or investing, Ivan Navincopa-Tu, Realtor Latino de confianza, and our team are here to deliver a smooth, professional, and personalized experience.
                </p>
              </div>
            </div>
            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="w-full h-96 md:h-[500px] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                <Image
                  src="/images/team/500SL.png"
                  alt="Blue Key Realty Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
      <HeroSub
        title="The Blue Key Realty Team"
        description="Professional. Bilingual. Infrastructure-Driven. A 22-year legacy built on a strong foundation."
        badge="Our Team"
      />
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
              className="inline-flex items-center gap-2 px-8 py-3 from-primary to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"  style={{ backgroundColor: '#00A86B' }}       >
              <Icon icon="mdi:phone" width={20} height={20} />
              Let&apos;s talk with Ivan
            </a>
          </div>
        </div>
      </section>
      </main>
      <FloatingBubbles />
    </>
  );
}
