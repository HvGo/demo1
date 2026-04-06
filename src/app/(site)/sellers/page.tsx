import { HeroSection } from '@/components/Sellers/HeroSection'
import ThreeTierMarketAnalysis from '@/components/Sellers/ThreeTierMarketAnalysis'
import SellingRealities from '@/components/Sellers/SellingRealities'
import ListingRoadmap from '@/components/Sellers/ListingRoadmap'
import { FloatingBubbles } from '@/components/Home/FloatingBubbles'

export const metadata = {
  title: 'Maximum Equity. Expert Strategy. | Sell Your Home in Utah',
  description: 'Expert home selling strategies in Utah. Maximize your equity with data-driven marketing and proven negotiation tactics.',
}

export default function SellersPage() {
  return (
    <>
      <HeroSection />
      <ThreeTierMarketAnalysis />
      <SellingRealities />
      <ListingRoadmap />
      <FloatingBubbles />
    </>
  )
}
