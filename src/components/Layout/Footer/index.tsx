import Link from "next/link";
import { Icon } from "@iconify/react"
import { FooterLinks } from "@/app/api/footerlinks";
import { getSiteSectionByKey, getContactInfo } from "@/lib/queries/content";
import Map from "@/components/Map";

const Footer = async () => {
  const section = await getSiteSectionByKey('home_footer');
  const contactInfo = await getContactInfo();
  
  if (section && section.isVisible === false) return null;
  
  const description = section?.description || 'Stay updated with the latest news, promotions, and exclusive offers.';
  const title = section?.title || 'Begin your path to success';
  const subtitle = section?.subtitle || 'contact us today';
  const ctaLabel = section?.primaryCtaLabel || 'Get In Touch';
  const ctaHref = section?.primaryCtaHref || '/contactus';

  const defaultSocialLinks = [
    { icon: "ph:x-logo-bold", label: "X", href: "#" },
    { icon: "ph:facebook-logo-bold", label: "Facebook", href: "#" },
    { icon: "ph:instagram-logo-bold", label: "Instagram", href: "#" },
    { icon: "ph:youtube-logo-bold", label: "YouTube", href: "#" },
    { icon: "ph:tiktok-logo-fill", label: "TikTok", href: "#" },
    { icon: "ph:google-logo", label: "Google", href: "#" },
  ];

  const socialLinksRaw = (section as any)?.contentData?.socialLinks;
  const socialLinks = Array.isArray(socialLinksRaw)
    ? socialLinksRaw.filter((item: any) => item && item.href && item.icon)
    : defaultSocialLinks;

  // Filtrar links para remover los especificados
  const linksToRemove = ['Luxury Villas', 'Residential Homes', 'Apartments', 'Contact Us', 'Blog', '404 Page', 'Documentation'];
  const filteredLinks = FooterLinks.filter(link => !linksToRemove.includes(link.label));

  return (
    <footer className="relative z-10 bg-dark">
      <div className="container mx-auto max-w-8xl pt-14 px-4 sm:px-6 lg:px-0">
        <div className="flex lg:items-center justify-between items-end lg:gap-11 pb-14 border-b border-white/10 lg:flex-nowrap flex-wrap gap-6">
          <p className="text-white text-sm lg:max-w-1/5">
            {description}
          </p>
          <div className="flex lg:flex-row flex-col items-center lg:gap-10 gap-3">
            <div className="flex gap-2 lg:order-1 order-2">
              <input type="email" placeholder="Enter Your Email" className="rounded-full py-4 px-6 bg-white/10 placeholder:text-white text-white focus-visible:outline-0" />
              <button className="text-dark bg-white py-4 px-8 font-semibold rounded-full hover:bg-primary hover:text-white duration-300 hover:cursor-pointer">
                Subscribe
              </button>
            </div>
            <p className="text-white/40 text-sm lg:max-w-[45%] order-1 lg:order-2">
              By subscribing, you agree to receive our promotional emails. You can unsubscribe  at any time.
            </p>
          </div>
          <div className="flex items-center gap-6">
            {socialLinks.map((item, idx) => (
              <Link key={idx} href={item.href} aria-label={item.label || 'social link'}>
                <Icon icon={item.icon} width={24} height={24} className="text-white hover:text-primary duration-300" />
              </Link>
            ))}
          </div>
        </div>
        <div className="py-16 border-b border-white/10">
          <div className="grid grid-cols-12 sm:gap-10 gap-y-6">
            <div className="md:col-span-5 col-span-12">
              <h2 className="text-white leading-[1.2] text-40 font-medium mb-6 lg:max-w-3/4">
                {title}
                <br />
                {subtitle}
              </h2>
              <Link href={ctaHref} className="bg-primary text-base font-semibold py-4 px-8 rounded-full text-white hover:bg-white hover:text-dark duration-300 hover:cursor-pointer">
                {ctaLabel}
              </Link>
            </div>
            <div className="md:col-span-3 sm:col-span-6 col-span-12">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">Contact Info</h3>
                  <div className="flex flex-col gap-3">
                    {contactInfo.email && (
                      <div className="flex items-center gap-2">
                        <Icon icon="ph:envelope" width={18} height={18} className="text-primary" />
                        <a href={`mailto:${contactInfo.email}`} className="text-white/40 text-sm hover:text-white">
                          {contactInfo.email}
                        </a>
                      </div>
                    )}
                    {contactInfo.phone && (
                      <div className="flex items-center gap-2">
                        <Icon icon="ph:phone" width={18} height={18} className="text-primary" />
                        <a href={`tel:${contactInfo.phone}`} className="text-white/40 text-sm hover:text-white">
                          {contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {contactInfo.address && (
                      <div className="flex items-start gap-2">
                        <Icon icon="ph:map-pin" width={18} height={18} className="text-primary mt-0.5" />
                        <p className="text-white/40 text-sm">
                          {contactInfo.address}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Hours</h3>
                  <div className="flex flex-col gap-2 text-white/40 text-sm">
                    <p>Monday – Friday: 9:00 a.m. – 6:00 p.m.</p>
                    <p>Saturday: 9:00 a.m. – 12:00 p.m.</p>
                    <p>Sunday – Closed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              {contactInfo.address && (
                <div>
                  <h3 className="text-white font-semibold mb-3">Location</h3>
                  <Map address={contactInfo.address} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between md:flex-nowrap flex-wrap items-center py-6 gap-6">
          <p className="text-white/40 text-sm ">
            &copy; {new Date().getFullYear()} Ivan Vavincopa - All rights reserved
          </p>
          <div className="flex gap-8 items-center">
            <Link href="#" className="text-white/40 hover:text-primary text-sm">
              Terms of service
            </Link>
            <Link href="#" className="text-white/40 hover:text-primary text-sm">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;