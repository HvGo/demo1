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
    // Default items if no data in BD - 2 images + 1 video
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
        id: '6',
        type: 'video',
        url: '/images/Gallery/2026-01-25-16-22-25-519.mov',
        thumbnail: '/images/Gallery/IMG_7525.jpg',
        title: 'Property Tour 1',
        category: 'Video Tour',
        duration: '2:30',
      },
    ]
  }

  return <Gallery title={title} subtitle={subtitle} items={items} />
}

export default VideoSection
