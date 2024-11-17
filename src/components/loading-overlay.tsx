import { useEffect, useState } from 'react'
import MiniLoader from './mini-loader'

interface LoadingOverlayProps {
  isLoading: boolean
  loadingText?: string
}

function LoadingOverlay({ isLoading, loadingText = 'Deleting...' }: LoadingOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!isVisible) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-navy rounded-lg p-6 flex flex-col items-center w-[300px] h-[200px]'>
        <MiniLoader />
        <p className='mt-4  text-lg font-medium'>{loadingText}</p>
      </div>
    </div>
  )
}

export default LoadingOverlay
