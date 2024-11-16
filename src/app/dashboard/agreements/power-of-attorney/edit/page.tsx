import type { Metadata } from 'next'
import Client from './client'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Edit Power of Attorney Agreement',
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Client />
    </Suspense>
  )
}
