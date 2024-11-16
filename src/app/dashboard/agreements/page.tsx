import type { Metadata } from 'next'
import Agreements from './client'

export const metadata: Metadata = {
  title: 'Agreements | Zeph Chambers',
  description: 'Manage and view your legal agreements',
}

export default function AgreementsPage() {
  return <Agreements />
}
