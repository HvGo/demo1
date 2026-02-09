import FeaturedProperty from '@/components/Home/FeaturedProperty'
import Hero from '@/components/Home/Hero'
import Profile from '@/components/Home/Profile'
import Properties from '@/components/Home/Properties'
import Services from '@/components/Home/Services'
import TestimonialSection from '@/components/Home/Testimonial/Section'
import BlogSmall from '@/components/shared/Blog'
import GetInTouch from '@/components/Home/GetInTouch'
import FAQ from '@/components/Home/FAQs'

export const revalidate = 600

export default function Home() {
  return (
    <main>
      <Hero />
      <Profile />
      <Services />
      <Properties />
      <FeaturedProperty />
      <TestimonialSection />
      <BlogSmall />
      <GetInTouch />
      <FAQ />
    </main>
  )
}
