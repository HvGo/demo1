'use client'

import { Icon } from '@iconify/react'
import { ReportsOpenHouses } from './ReportsOpenHouses'

interface ReportsOpenHousesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ReportsOpenHousesModal = ({ isOpen, onClose }: ReportsOpenHousesModalProps) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className='fixed inset-0 bg-black/50 z-40 transition-opacity'
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className='fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4'>
        <div className='bg-white dark:bg-dark rounded-lg shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col'>
          {/* Header */}
          <div className='sticky top-0 bg-white dark:bg-dark border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0'>
            <h2 className='text-lg sm:text-2xl font-bold truncate'>Ver Mi Plan de Marketing</h2>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 dark:hover:bg-dark/50 rounded-full transition-colors flex-shrink-0 ml-4'
              aria-label='Close modal'
            >
              <Icon icon='mdi:close' width={24} height={24} />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className='overflow-y-auto flex-1'>
            <div className='px-4 sm:px-6 py-6'>
              <ReportsOpenHouses onClose={onClose} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
