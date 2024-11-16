import type { Metadata } from 'next'
import Client from './client'
import { Suspense } from 'react'
export const metadata: Metadata = {
  title: 'Edit Lease Agreement',
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Client />
    </Suspense>
  )
}
