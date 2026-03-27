'use client'

interface MatterportViewerProps {
  matterportUrl: string
  title?: string
  height?: string
}

export const MatterportViewer = ({ 
  matterportUrl, 
  title = '3D Virtual Tour',
  height = '600px'
}: MatterportViewerProps) => {
  // Extraer el ID de Matterport de la URL
  // Formato: https://my.matterport.com/show/?m=DEkqXFgPVBQ
  const extractMatterportId = (url: string): string => {
    const match = url.match(/[?&]m=([^&]+)/)
    return match ? match[1] : ''
  }

  const matterportId = extractMatterportId(matterportUrl)

  if (!matterportId) {
    return (
      <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
        <p className='text-red-700 dark:text-red-400'>
          Invalid Matterport URL. Please provide a valid Matterport link.
        </p>
      </div>
    )
  }

  return (
    <div className='w-full'>
      {title && (
        <h3 className='text-2xl font-bold text-dark dark:text-white mb-4'>
          {title}
        </h3>
      )}
      
      <div className='relative w-full rounded-lg overflow-hidden shadow-lg' style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://my.matterport.com/show/?m=${matterportId}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          allowFullScreen
          allow='xr-spatial-tracking'
          title={title}
        />
      </div>
      
      <p className='text-sm text-gray-500 dark:text-gray-400 mt-4'>
        <a 
          href={matterportUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className='text-primary hover:underline'
        >
          Open in full screen →
        </a>
      </p>
    </div>
  )
}
