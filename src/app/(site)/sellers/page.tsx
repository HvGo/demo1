import HeroSub from '@/components/shared/HeroSub'
import { MarketIntelligence } from '@/components/Sellers/MarketIntelligence'
import { MarketingPower } from '@/components/Sellers/MarketingPower'
import { SellingProcess } from '@/components/Sellers/SellingProcess'
import { CMAForm } from '@/components/Sellers/CMAForm'

export const metadata = {
  title: 'Maximum Equity. Expert Strategy. | Sell Your Home in Utah',
  description: 'Expert home selling strategies in Utah. Maximize your equity with data-driven marketing and proven negotiation tactics.',
}

export default function SellersPage() {
  return (
    <>
      <HeroSub
        title="Maximum Equity. Expert Strategy."
        description="Venda su casa con un plan diseñado para ganar en el mercado de Utah."
        badge="For Sellers"
      />
      <MarketIntelligence />
      <MarketingPower />
      <SellingProcess />
      <CMAForm />
    </>
  )
}
