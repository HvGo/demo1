import Gallery from '@/components/Home/Gallery'
import { getSiteSectionByKey } from '@/lib/queries/content'

interface GalleryItem {
  id: string
  type: 'image' | 'video'
  url: string
  thumbnail?: string
  title: string
  category?: string
  duration?: string
}

const VideoSection = async () => {
  const section = await getSiteSectionByKey('home_video_section')

  if (section && section.isVisible === false) return null

  const title = section?.title || 'Gallery'
  const subtitle = section?.subtitle || 'Explore our properties'

  // Get gallery items from contentData
  let items: GalleryItem[] = []

  if (section?.contentData && Array.isArray(section.contentData)) {
    items = section.contentData as GalleryItem[]
  } else {
    // Default items if no data in BD
    items = [
      {
        id: '1',
        type: 'image',
        url: '/images/Gallery/IMG_7525.jpg',
        title: 'Property 1',
        category: 'Luxury',
      },
      {
        id: '2',
        type: 'image',
        url: '/images/Gallery/IMG_7529.jpg',
        title: 'Property 2',
        category: 'Modern',
      },
      {
        id: '3',
        type: 'image',
        url: '/images/Gallery/IMG_7531.jpg',
        title: 'Property 3',
        category: 'Contemporary',
      },
      {
        id: '4',
        type: 'image',
        url: '/images/Gallery/IMG_7535.jpg',
        title: 'Property 4',
        category: 'Luxury',
      },
      {
        id: '5',
        type: 'image',
        url: '/images/Gallery/IMG_7547.jpg',
        title: 'Property 5',
        category: 'Modern',
      },
      {
        id: '6',
        type: 'video',
        url: '/images/Gallery/2026-01-25-16-22-25-519.mov',
        thumbnail: '/images/Gallery/IMG_7525.jpg',
        title: 'Property Tour 1',
        category: 'Video Tour',
        duration: '2:30',
      },
      {
        id: '7',
        type: 'video',
        url: '/images/Gallery/2026-01-25-16-23-02-366.mov',
        thumbnail: '/images/Gallery/IMG_7529.jpg',
        title: 'Property Tour 2',
        category: 'Video Tour',
        duration: '2:45',
      },
      {
        id: '8',
        type: 'video',
        url: '/images/Gallery/2026-01-25-16-24-08-484.mov',
        thumbnail: '/images/Gallery/IMG_7531.jpg',
        title: 'Property Tour 3',
        category: 'Video Tour',
        duration: '2:20',
      },
    ]
  }

  return <Gallery title={title} subtitle={subtitle} items={items} />
}

export default VideoSection
