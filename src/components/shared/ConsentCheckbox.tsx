'use client'

import Link from 'next/link'

interface ConsentCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  id?: string
  className?: string
}

export default function ConsentCheckbox({
  checked,
  onChange,
  id = 'sms-consent',
  className = '',
}: ConsentCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
        className="mt-1 h-4 w-4 flex-shrink-0 accent-primary cursor-pointer"
      />
      <span>
        I agree to be contacted by Blue Key Realty, LLC via call, email, and text for real estate services.
        Message and data rates may apply. Message frequency may vary. Reply STOP to opt out at any time or HELP
        for assistance. View our{' '}
        <Link href="/privacy-policy" target="_blank" className="text-primary underline hover:text-primary/80">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link href="/terms-and-conditions" target="_blank" className="text-primary underline hover:text-primary/80">
          Terms &amp; Conditions
        </Link>
        .
      </span>
    </label>
  )
}
