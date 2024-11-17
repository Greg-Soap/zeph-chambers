import type { Metadata } from 'next'
import Client from './client'
import { Suspense } from 'react'
import MiniLoader from '@/components/mini-loader'

export const metadata: Metadata = {
  title: 'Edit Loan Agreement',
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center h-screen w-full'>
          <MiniLoader />
        </div>
      }>
      <Client />
    </Suspense>
  )
}
