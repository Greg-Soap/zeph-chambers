import type { Metadata } from 'next'
import Agreements from './client'
import { Suspense } from 'react'
import MiniLoader from '@/components/mini-loader'

export const metadata: Metadata = {
  title: 'Agreements | Zeph Chambers',
  description: 'Manage and view your legal agreements',
}

export default function AgreementsPage() {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center h-screen w-full'>
          <MiniLoader />
        </div>
      }>
      <Agreements />
    </Suspense>
  )
}
