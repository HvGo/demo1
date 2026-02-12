import Hero from '@/components/Home/Hero'
import Profile from '@/components/Home/Profile'
import TestimonialSection from '@/components/Home/Testimonial/Section'
import BlogSmall from '@/components/shared/Blog'
import FAQ from '@/components/Home/FAQs'
import FeaturedProperty from '@/components/Home/FeaturedProperty'
import Properties from '@/components/Home/Properties'
import Services from '@/components/Home/Services'
import GetInTouch from '@/components/Home/GetInTouch'

export const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'home_hero': Hero,
  'home_testimonials': TestimonialSection,
  'home_blog': BlogSmall,
  'home_faqs': FAQ,
  'home_profile': Profile,
  'home_featured_property': FeaturedProperty,
  'home_properties': Properties,
  'home_categories': Services,
  'home_video_section': GetInTouch,
};

export function getSectionComponent(key: string) {
  return SECTION_COMPONENTS[key];
}

export function isValidSectionKey(key: string): boolean {
  return key in SECTION_COMPONENTS;
}
