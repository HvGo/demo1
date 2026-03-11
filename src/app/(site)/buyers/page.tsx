import HeroSub from '@/components/shared/HeroSub'
import { FinancialPaths } from '@/components/Buyers/FinancialPaths'
import { WealthFactor } from '@/components/Buyers/WealthFactor'
import { ClearPath } from '@/components/Buyers/ClearPath'
import { CommonDoubts } from '@/components/Buyers/CommonDoubts'

export const metadata = {
  title: 'Your Path to Homeownership | Utah First-Time Buyer Expert',
  description: 'Expert guidance for first-time home buyers in Utah. Learn about FHA, VA, and ITIN financing options.',
}

export default function BuyersPage() {
  return (
    <>
      <HeroSub
        title="Your Path to Homeownership"
        description="Expert guidance for first-time home buyers in Utah. Learn about FHA, VA, and ITIN financing options."
        badge="For Buyers"
      />
      <FinancialPaths />
      <WealthFactor />
      <ClearPath />
      <CommonDoubts />
    </>
  )
}
