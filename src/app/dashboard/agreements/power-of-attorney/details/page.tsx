import type { Metadata } from 'next'
import Client from './client'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Power of Attorney Agreement Details',
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Client />
    </Suspense>
  )
}
