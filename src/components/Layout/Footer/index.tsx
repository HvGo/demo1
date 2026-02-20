import Link from "next/link";
import { Icon } from "@iconify/react"
import { FooterLinks } from "@/app/api/footerlinks";
import { getSiteSectionByKey } from "@/lib/queries/content";

const Footer = async () => {
  const section = await getSiteSectionByKey('home_footer');
  
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
            <div className="md:col-span-7 col-span-12">
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
              <div className="flex flex-col gap-4 w-fit">
                {FooterLinks.slice(0, 4).map((item, index) => (
                  <div key={index}>
                    <Link href={item.href} className="text-white/40 text-xm hover:text-white">
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 sm:col-span-6 col-span-12">
              <div className="flex flex-col gap-4 w-fit">
                {FooterLinks.slice(4, 8).map((item, index) => (
                  <div key={index}>
                    <Link href={item.href} className="text-white/40 text-xm hover:text-white">
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between md:flex-nowrap flex-wrap items-center py-6 gap-6">
          <p className="text-white/40 text-sm ">
            ©2025 Homely - Design & Developed by <Link href="https://getnextjstemplates.com/" className="hover:text-primary" target="_blanck">GetNextJs Templates</Link>
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