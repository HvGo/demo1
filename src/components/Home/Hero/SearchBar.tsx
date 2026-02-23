'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'

interface SearchTab {
  id: string
  label: string
}

interface SearchBarProps {
  tabs?: SearchTab[]
  placeholder?: string
  buttonLabel?: string
}

const SearchBar = ({ 
  tabs = [
    { id: 'buy', label: 'BUY A HOME' },
    { id: 'sell', label: 'SELL A HOME' },
    { id: 'value', label: 'HOME VALUE' }
  ],
  placeholder = 'Search by city, county, or zip',
  buttonLabel = 'SEARCH'
}: SearchBarProps) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 'buy')
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/properties')
  }

  return (
    <div className='w-full bg-white dark:bg-dark rounded-2xl p-6 sm:p-8 shadow-lg'>
      {/* Tabs */}
      <div className='flex gap-8 sm:gap-12 border-b border-dark/10 dark:border-white/10 mb-6'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm sm:text-base font-semibold transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-dark dark:text-white border-b-2 border-dark dark:border-white'
                : 'text-dark/50 dark:text-white/50 hover:text-dark/75 dark:hover:text-white/75'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <input
            type='text'
            placeholder={placeholder}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className='w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 dark:bg-gray-800 text-dark dark:text-white placeholder-dark/40 dark:placeholder-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all'
          />
        </div>
        <button
          type='submit'
          className='px-6 sm:px-10 py-3 sm:py-4 bg-dark dark:bg-white text-white dark:text-dark font-semibold rounded-lg hover:bg-primary dark:hover:bg-primary transition-colors whitespace-nowrap flex items-center justify-center gap-2'
        >
          <Icon icon='ph:magnifying-glass-bold' width={20} height={20} />
          <span className='hidden sm:inline'>{buttonLabel}</span>
        </button>
      </form>
    </div>
  )
}

export default SearchBar
