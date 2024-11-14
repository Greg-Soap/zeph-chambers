import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agreements | Zeph Chambers',
  description: 'Manage and view your legal agreements',
}

export default function AgreementsPage() {
  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold tracking-tight'>Agreements</h1>
      <div className='rounded-lg border bg-card p-6'>{/* Your agreements content */}</div>
    </div>
  )
}
