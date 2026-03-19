import { HeroSection } from '@/components/Sellers/HeroSection'
import { MarketingPower } from '@/components/Sellers/MarketingPower'
import { SellingProcess } from '@/components/Sellers/SellingProcess'

export const metadata = {
  title: 'Maximum Equity. Expert Strategy. | Sell Your Home in Utah',
  description: 'Expert home selling strategies in Utah. Maximize your equity with data-driven marketing and proven negotiation tactics.',
}

export default function SellersPage() {
  return (
    <>
      <HeroSection />
      <MarketingPower />
      <SellingProcess />
    </>
  )
}
