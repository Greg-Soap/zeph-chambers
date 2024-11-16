import type { Metadata } from 'next'
import Agreements from './client'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Agreements | Zeph Chambers',
  description: 'Manage and view your legal agreements',
}

export default function AgreementsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Agreements />
    </Suspense>
  )
}
