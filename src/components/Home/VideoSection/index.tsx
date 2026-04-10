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

  const title = section?.title || ''
  const subtitle = section?.subtitle || ''

  // Get gallery items from contentData
  let items: GalleryItem[] = []

  if (section?.contentData && Array.isArray(section.contentData)) {
    items = section.contentData as GalleryItem[]
  } else {
    // Default items if no data in BD - 1 video only
    items = [
      {
        id: '1',
        type: 'video',
        url: '/images/Gallery/video_intro.mp4',
        thumbnail: '/images/Gallery/introvideo.png',
        title: 'Video Intro',
        category: 'Video',
        duration: '0:00',
      },
    ]
  }

  return <Gallery title={title} subtitle={subtitle} items={items} />
}

export default VideoSection
