'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function PaymentCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(0)
  const [downPaymentOption, setDownPaymentOption] = useState('dpa') // dpa, grant, itin
  const [customDownPayment, setCustomDownPayment] = useState(0)
  const [interestRate, setInterestRate] = useState(0)
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
      case 'custom':
        return { amount: customDownPayment, label: 'Custom Down Payment', description: 'Your custom amount' }
      default:
        return { amount: 0, label: 'Select Option', description: '' }
    }
  }

  const downPaymentInfo = getDownPaymentInfo()
  const downPaymentAmount = downPaymentInfo.amount
  const loanAmount = purchasePrice > 0 ? purchasePrice - downPaymentAmount : 0
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
            {/* Purchase Price Input */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-dark dark:text-white mb-4">
                Purchase Price (Precio de Venta)
              </label>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-dark dark:text-white font-semibold text-lg focus:outline-none focus:border-green-500"
                    style={{ borderColor: purchasePrice > 0 ? '#00A86B' : undefined }}
                    placeholder="0"
                  />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold" style={{ color: '#00A86B' }}>
                    ${(purchasePrice / 1000).toFixed(0)}K
                  </p>
                </div>
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
                    className="w-4 h-4"
                    style={{ accentColor: '#00A86B' }}
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
                    className="w-4 h-4"
                    style={{ accentColor: '#00A86B' }}
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
                    className="w-4 h-4"
                    style={{ accentColor: '#00A86B' }}
                  />
                  <span className="ml-3 flex-1">
                    <span className="font-semibold text-dark dark:text-white">ITIN Path</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">15% down payment floor</p>
                  </span>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary transition-colors" style={{ borderColor: downPaymentOption === 'custom' ? '#273ba8' : undefined }}>
                  <input
                    type="radio"
                    name="downPayment"
                    value="custom"
                    checked={downPaymentOption === 'custom'}
                    onChange={(e) => setDownPaymentOption(e.target.value)}
                    className="w-4 h-4"
                    style={{ accentColor: '#00A86B' }}
                  />
                  <span className="ml-3 flex-1">
                    <span className="font-semibold text-dark dark:text-white">Custom Amount</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enter your own down payment</p>
                  </span>
                </label>
              </div>

              {downPaymentOption === 'custom' && (
                <div className="mt-4 p-4 rounded-lg border-2" style={{ backgroundColor: 'rgba(0, 168, 107, 0.05)', borderColor: 'rgba(0, 168, 107, 0.2)' }}>
                  <label className="block text-sm font-semibold text-dark dark:text-white mb-2">
                    Custom Down Payment Amount
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={customDownPayment}
                    onChange={(e) => setCustomDownPayment(Number(e.target.value))}
                    className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-dark dark:text-white font-semibold focus:outline-none focus:border-green-500"
                    placeholder="0"
                  />
                </div>
              )}
            </div>

            {/* Interest Rate Input */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-dark dark:text-white mb-4">
                Interest Rate (Tasa de Interés)
              </label>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-dark dark:text-white font-semibold text-lg focus:outline-none focus:border-green-500"
                    style={{ borderColor: interestRate > 0 ? '#00A86B' : undefined }}
                    placeholder="0"
                  />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold" style={{ color: '#00A86B' }}>
                    {interestRate.toFixed(2)}%
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Ask me about Rate Buy-downs to lower this number even further.
              </p>
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
                        ? 'text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-dark dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                    style={loanTerm === term ? { backgroundColor: '#00A86B' } : {}}
                  >
                    {term} Years
                  </button>
                ))}
              </div>
            </div>

            {/* PMI Toggle (ITIN Exclusive) */}
            {downPaymentOption === 'itin' && (
              <div className="mb-8 p-4 rounded-lg border" style={{ backgroundColor: 'rgba(0, 168, 107, 0.1)', borderColor: 'rgba(0, 168, 107, 0.2)' }}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!includePMI}
                    onChange={(e) => setIncludePMI(!e.target.checked)}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: '#00A86B' }}
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

          {/* Results Panel - Calculator Display */}
          <div className="lg:col-span-1">
            <div className="rounded-lg p-8 sticky top-8" style={{ backgroundColor: '#172043', border: '2px solid #00A86B' }}>
              <div className="flex items-center gap-2 mb-6">
                <Icon icon="mdi:calculator" width={24} height={24} style={{ color: '#00A86B' }} />
                <h3 className="text-xl font-bold text-white">
                  Your Estimate
                </h3>
              </div>

              {/* Down Payment Info */}
              <div className="mb-6 pb-6 border-b" style={{ borderColor: 'rgba(0, 168, 107, 0.3)' }}>
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Down Payment</p>
                <p className="text-3xl font-bold" style={{ color: '#00A86B' }}>
                  ${downPaymentAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {downPaymentInfo.label}
                </p>
              </div>

              {/* Loan Amount */}
              <div className="mb-6 pb-6 border-b" style={{ borderColor: 'rgba(0, 168, 107, 0.3)' }}>
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Loan Amount</p>
                <p className="text-3xl font-bold text-white">
                  ${loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </div>

              {/* Monthly Payment Breakdown */}
              <div className="mb-6 pb-6 border-b" style={{ borderColor: 'rgba(0, 168, 107, 0.3)' }}>
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">Monthly Breakdown</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Principal & Interest</span>
                    <span className="font-semibold">${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  {pmiMonthly > 0 && (
                    <div className="flex justify-between text-red-400">
                      <span>Mortgage Insurance (PMI)</span>
                      <span className="font-semibold">${pmiMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-300">
                    <span>Property Tax</span>
                    <span className="font-semibold">${propertyTaxMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Home Insurance</span>
                    <span className="font-semibold">${homeInsuranceMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              {/* Total Monthly Payment - Main Display */}
              <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'rgba(0, 168, 107, 0.15)', border: '2px solid #00A86B' }}>
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest font-semibold">Total Monthly Payment</p>
                <p className="text-5xl font-bold" style={{ color: '#00A86B' }}>
                  ${totalMonthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  Includes P&I, taxes, insurance & PMI
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/contactus"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition-colors"
                style={{ backgroundColor: '#00A86B' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#008C5A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00A86B'}
              >
                <Icon icon="mdi:phone" width={18} height={18} className="text-white" />
                Solicitar mi presupuesto
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
