import Hero from '@/components/Home/Hero'
import HeroDescription from '@/components/Home/HeroDescription'
import Profile from '@/components/Home/Profile'
import TestimonialSection from '@/components/Home/Testimonial/Section'
import BlogSmall from '@/components/shared/Blog'
import FAQ from '@/components/Home/FAQs'
import FeaturedProperty from '@/components/Home/FeaturedProperty'
import Properties from '@/components/Home/Properties'
import Services from '@/components/Home/Services'
import Stats from '@/components/Home/Stats'
import HowIHelp from '@/components/Home/HowIHelp'
import VideoSection from '@/components/Home/VideoSection'
import LocalExpertise from '@/components/Home/LocalExpertise'
import PropertySearch from '@/components/Home/PropertySearch'

export const SECTION_COMPONENTS: Record<string, React.ComponentType<unknown>> = {
  'home_hero': Hero,
  'home_hero_description': HeroDescription,
  'home_property_search': PropertySearch,
  'home_stats': Stats,
  'home_how_i_help': HowIHelp,
  'home_testimonials': TestimonialSection,
  'home_blog': BlogSmall,
  'home_faqs': FAQ,
  'home_profile': Profile,
  'home_featured_property': FeaturedProperty,
  'home_properties': Properties,
  'home_services': Services,
  'home_video_section': VideoSection,
  'home_local_expertise': LocalExpertise,
  // Compatibilidad: algunos contenidos usan `home_categories` como key histórico.
  'home_categories': Services,
};

export function getSectionComponent(key: string) {
  return SECTION_COMPONENTS[key];
}

export function isValidSectionKey(key: string): boolean {
  return key in SECTION_COMPONENTS;
}
