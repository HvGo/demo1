'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function PaymentCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(450000)
  const [downPaymentOption, setDownPaymentOption] = useState('dpa') // dpa, grant, itin
  const [interestRate, setInterestRate] = useState(6.5)
  const [includePMI, setIncludePMI] = useState(true)
  const [loanTerm, setLoanTerm] = useState(30)

  // Calculate down payment based on option
  const getDownPaymentInfo = () => {
    switch (downPaymentOption) {
      case 'dpa':
        return { amount: 0, label: 'Utah Housing (DPA)', description: '$0 out of pocket for down payment' }
      case 'grant':
        return { amount: 20000, label: '$20,000 Grant', description: 'Deducted from loan amount' }
      case 'itin':
        return { amount: purchasePrice * 0.15, label: '15% Down Payment', description: 'ITIN Path' }
      default:
        return { amount: 0, label: 'Select Option', description: '' }
    }
  }

  const downPaymentInfo = getDownPaymentInfo()
  const downPaymentAmount = downPaymentInfo.amount
  const loanAmount = purchasePrice - downPaymentAmount
  const monthlyRate = interestRate / 100 / 12
  const numberOfPayments = loanTerm * 12

  // Calculate mortgage payment (P&I)
  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  // Calculate PMI (if applicable)
  const pmiMonthly =
    includePMI && downPaymentAmount < purchasePrice * 0.2
      ? (loanAmount * 0.005) / 12
      : 0

  // Estimate property tax, insurance, HOA
  const propertyTaxMonthly = (purchasePrice * 0.0085) / 12 // Approximate Utah rate
  const homeInsuranceMonthly = 150 // Average estimate
  const hoaMonthly = 0 // Can be adjusted

  const totalMonthlyPayment = monthlyPayment + pmiMonthly + propertyTaxMonthly + homeInsuranceMonthly + hoaMonthly

  const savingsWithoutPMI = pmiMonthly * numberOfPayments

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-dark/50">
      <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            Strategic Payment Estimator
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            &quot;See your numbers before you commit.&quot; Our interactive calculator shows you exactly what your monthly payment will be with different down payment strategies, interest rates, and loan terms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Controls */}
          <div className="lg:col-span-2 bg-white dark:bg-dark rounded-lg p-8 border border-gray-200 dark:border-gray-700">
            {/* Purchase Price Slider */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-dark dark:text-white mb-4">
                Purchase Price (Precio de Venta)
              </label>
              <input
                type="range"
                min="300000"
                max="800000"
                step="10000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-3xl font-bold text-teal-500">
                  ${(purchasePrice / 1000).toFixed(0)}K
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ${purchasePrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Down Payment & Grants Options */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-dark dark:text-white mb-4">
                Down Payment & Grants (Enganche y Ayudas)
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary transition-colors" style={{ borderColor: downPaymentOption === 'dpa' ? '#273ba8' : undefined }}>
                  <input
                    type="radio"
                    name="downPayment"
                    value="dpa"
                    checked={downPaymentOption === 'dpa'}
                    onChange={(e) => setDownPaymentOption(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-3 flex-1">
                    <span className="font-semibold text-dark dark:text-white">Utah Housing (DPA)</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">$0 out of pocket for down payment</p>
                  </span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary transition-colors" style={{ borderColor: downPaymentOption === 'grant' ? '#273ba8' : undefined }}>
                  <input
                    type="radio"
                    name="downPayment"
                    value="grant"
                    checked={downPaymentOption === 'grant'}
                    onChange={(e) => setDownPaymentOption(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-3 flex-1">
                    <span className="font-semibold text-dark dark:text-white">$20,000 New Construction Grant</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Valid for homes up to $450K</p>
                  </span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary transition-colors" style={{ borderColor: downPaymentOption === 'itin' ? '#273ba8' : undefined }}>
                  <input
                    type="radio"
                    name="downPayment"
                    value="itin"
                    checked={downPaymentOption === 'itin'}
                    onChange={(e) => setDownPaymentOption(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="ml-3 flex-1">
                    <span className="font-semibold text-dark dark:text-white">ITIN Path</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">15% down payment floor</p>
                  </span>
                </label>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-dark dark:text-white mb-4">
                Interest Rate (Tasa de Interés)
              </label>
              <input
                type="range"
                min="4"
                max="9"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-3xl font-bold text-teal-500">
                  {interestRate.toFixed(2)}%
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Ask me about Rate Buy-downs to lower this number even further.
                </span>
              </div>
            </div>

            {/* Loan Term */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-dark dark:text-white mb-4">
                Loan Term
              </label>
              <div className="flex gap-4">
                {[15, 20, 30].map((term) => (
                  <button
                    key={term}
                    onClick={() => setLoanTerm(term)}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                      loanTerm === term
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-dark dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {term} Years
                  </button>
                ))}
              </div>
            </div>

            {/* PMI Toggle (ITIN Exclusive) */}
            {downPaymentOption === 'itin' && (
              <div className="mb-8 p-4 bg-teal-500/10 dark:bg-teal-500/20 rounded-lg border border-teal-500/20">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!includePMI}
                    onChange={(e) => setIncludePMI(!e.target.checked)}
                    className="w-4 h-4 text-teal-500 rounded"
                  />
                  <span className="ml-3 flex-1">
                    <span className="font-semibold text-dark dark:text-white">No PMI (Exclusive ITIN)</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Save ${savingsWithoutPMI.toLocaleString('en-US', { maximumFractionDigits: 0 })} over {loanTerm} years
                    </p>
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary/10 to-teal-500/10 dark:from-primary/5 dark:to-teal-500/5 rounded-lg p-8 border border-primary/20 dark:border-primary/30 sticky top-8">
              <h3 className="text-xl font-bold text-dark dark:text-white mb-6">
                Your Estimate
              </h3>

              {/* Down Payment Info */}
              <div className="mb-6 pb-6 border-b border-teal-500/20">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Down Payment</p>
                <p className="text-2xl font-bold text-teal-500">
                  ${downPaymentAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {downPaymentInfo.label}
                </p>
              </div>

              {/* Loan Amount */}
              <div className="mb-6 pb-6 border-b border-teal-500/20">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Loan Amount</p>
                <p className="text-2xl font-bold text-dark dark:text-white">
                  ${loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </div>

              {/* Monthly Payment Breakdown */}
              <div className="mb-6 pb-6 border-b border-teal-500/20">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Monthly Payment Breakdown</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Principal & Interest</span>
                    <span className="font-semibold">${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  {pmiMonthly > 0 && (
                    <div className="flex justify-between text-red-600 dark:text-red-400">
                      <span>Mortgage Insurance (PMI)</span>
                      <span className="font-semibold">${pmiMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Property Tax</span>
                    <span className="font-semibold">${propertyTaxMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Home Insurance</span>
                    <span className="font-semibold">${homeInsuranceMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              {/* Total Monthly Payment */}
              <div className="mb-8 p-4 bg-teal-500/20 dark:bg-teal-500/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Estimated Total Monthly Payment</p>
                <p className="text-4xl font-bold text-teal-500">
                  ${totalMonthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/contactus"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Icon icon="mdi:phone" width={18} height={18} className="text-white" />
                Get My Personalized Quote
              </Link>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-4 text-center">
                This is an estimate. Ready for your exact numbers?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
