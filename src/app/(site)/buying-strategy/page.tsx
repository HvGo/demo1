import { FloatingBubbles } from '@/components/Home/FloatingBubbles'
import BuyingStrategyHero from '@/components/BuyingStrategy/Hero'
import DownPaymentAssistance from '@/components/BuyingStrategy/DownPaymentAssistance'
import ITINLoans from '@/components/BuyingStrategy/ITINLoans'
import Communities from '@/components/BuyingStrategy/Communities'
import SuccessStories from '@/components/BuyingStrategy/SuccessStories'
import BuyingRoadmap from '@/components/BuyingStrategy/BuyingRoadmap'
import PaymentCalculator from '@/components/BuyingStrategy/PaymentCalculator'

export const metadata = {
  title: 'Buying Strategy | Blue Key Realty',
  description: 'Discover our comprehensive buying strategy including down payment assistance, ITIN loans, and expert guidance for Utah homebuyers.'
}

export default function BuyingStrategy() {
  return (
    <>
      <BuyingStrategyHero />

      <main className="bg-white dark:bg-dark">
        {/* Section 1: Down Payment Assistance */}
        <DownPaymentAssistance />

        {/* Section 2: ITIN Loans */}
        <ITINLoans />

        {/* Section 3: Communities */}
        <Communities />

        {/* Section 4: Success Stories */}
        <SuccessStories />

        {/* Section 5: Buying Roadmap */}
        <BuyingRoadmap />

        {/* Section 6: Payment Calculator */}
        <PaymentCalculator />
      </main>

      <FloatingBubbles />
    </>
  )
}
