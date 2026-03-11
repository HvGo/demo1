import HeroSub from '@/components/shared/HeroSub'
import { IvanProfile } from '@/components/About/IvanProfile'
import { TeamSection } from '@/components/About/TeamSection'
import { TestimonialsSection } from '@/components/About/TestimonialsSection'

export const metadata = {
  title: 'About Us | Blue Key Realty - Team & Authority',
  description: 'Meet Ivan Navincopa and the Blue Key Team. 23 years of expertise in Utah real estate.',
}

export default function AboutPage() {
  return (
    <>
      <HeroSub
        title="About Blue Key Realty"
        description="Education is the bridge between a dream and a deed. Meet our team of experts dedicated to your success."
        badge="About Us"
      />
      <IvanProfile />
      <TeamSection />
      <TestimonialsSection />
    </>
  )
}
