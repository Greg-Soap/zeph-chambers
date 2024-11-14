import type { Metadata } from 'next'
import Litigation from './client'

export const metadata: Metadata = {
  title: 'Litigations | Zeph Chambers',
  description: 'View and manage litigation cases and legal disputes',
}

export default function LitigationsPage() {
  return <Litigation />
}
