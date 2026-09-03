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
        className="mt-1 h-4 w-4 flex-shrink-0 accent-primary cursor-pointer"
      />
      <span>
        I agree to be contacted by BLUE KEY REALTY LLC via call, email, and text for real estate services. To opt
        out, you can reply &apos;stop&apos; at any time or reply &apos;help&apos; for assistance. You can also
        click the unsubscribe link in the emails. Message and data rates may apply. Message frequency may vary.{' '}
        <Link href="/privacy-policy" target="_blank" className="text-primary underline hover:text-primary/80">
          Privacy Policy
        </Link>
      </span>
    </label>
  )
}
