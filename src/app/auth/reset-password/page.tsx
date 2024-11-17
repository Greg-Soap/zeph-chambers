import { Suspense } from 'react'
import ResetPassword from './client'
import MiniLoader from '@/components/mini-loader'

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center h-screen w-full'>
          <MiniLoader />
        </div>
      }>
      <ResetPassword />
    </Suspense>
  )
}
