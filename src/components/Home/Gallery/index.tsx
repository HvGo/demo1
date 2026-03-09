'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'

interface GalleryItem {
  id: string
  type: 'image' | 'video'
  url: string
  thumbnail?: string
  title: string
  category?: string
  duration?: string
}

interface GalleryProps {
  title?: string
  subtitle?: string
  items: GalleryItem[]
}

const Gallery: React.FC<GalleryProps> = ({ title = 'Gallery', subtitle, items }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedItem(items[newIndex])
  }

  const handleNext = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedItem(items[newIndex])
  }

  const handleItemClick = (item: GalleryItem, index: number) => {
    setSelectedItem(item)
    setCurrentIndex(index)
  }

  return (
    <section className='py-16 md:py-24 bg-white dark:bg-dark'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        {/* Header */}
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-dark dark:text-white mb-4'>
            {title}
          </h2>
          {subtitle && (
            <p className='text-lg text-dark/60 dark:text-white/60 max-w-2xl mx-auto'>
              {subtitle}
            </p>
          )}
        </div>

        {/* Gallery Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item, index)}
              className='group relative overflow-hidden rounded-lg cursor-pointer aspect-video bg-dark dark:bg-black'
            >
              {/* Thumbnail */}
              <Image
                src={item.thumbnail || item.url}
                alt={item.title}
                fill
                className='object-cover group-hover:scale-110 transition-transform duration-300'
                unoptimized={true}
              />

              {/* Overlay */}
              <div className='absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center'>
                {/* Play Icon for Videos */}
                {item.type === 'video' && (
                  <div className='flex items-center justify-center w-16 h-16 rounded-full bg-primary/90 group-hover:bg-primary transition-colors'>
                    <Icon icon='mdi:play' className='text-white text-3xl ml-1' />
                  </div>
                )}

                {/* Image Icon for Images */}
                {item.type === 'image' && (
                  <div className='flex items-center justify-center w-16 h-16 rounded-full bg-primary/90 group-hover:bg-primary transition-colors'>
                    <Icon icon='mdi:image' className='text-white text-3xl' />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4'>
                <h3 className='text-white font-semibold text-sm md:text-base line-clamp-2'>
                  {item.title}
                </h3>
                {item.category && (
                  <p className='text-white/70 text-xs mt-1'>{item.category}</p>
                )}
                {item.duration && item.type === 'video' && (
                  <p className='text-white/70 text-xs mt-1'>{item.duration}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'
          onClick={() => setSelectedItem(null)}
        >
          <div
            className='relative w-full max-w-4xl max-h-[90vh]'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className='absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors'
            >
              <Icon icon='mdi:close' className='text-white text-2xl' />
            </button>

            {/* Content */}
            {selectedItem.type === 'image' ? (
              <Image
                src={selectedItem.url}
                alt={selectedItem.title}
                width={1200}
                height={800}
                className='w-full h-auto rounded-lg object-contain'
                unoptimized={true}
              />
            ) : (
              <video
                src={selectedItem.url}
                controls
                autoPlay
                className='w-full h-auto rounded-lg'
              />
            )}

            {/* Navigation */}
            {items.length > 1 && (
              <>
                {/* Previous Button */}
                <button
                  onClick={handlePrevious}
                  className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors'
                >
                  <Icon icon='mdi:chevron-left' className='text-white text-2xl' />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors'
                >
                  <Icon icon='mdi:chevron-right' className='text-white text-2xl' />
                </button>

                {/* Counter */}
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 px-4 py-2 rounded-full text-white text-sm'>
                  {currentIndex + 1} / {items.length}
                </div>
              </>
            )}

            {/* Title */}
            <div className='absolute bottom-16 left-4 right-4 text-white'>
              <h3 className='text-xl font-semibold'>{selectedItem.title}</h3>
              {selectedItem.category && (
                <p className='text-white/70 text-sm mt-1'>{selectedItem.category}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
