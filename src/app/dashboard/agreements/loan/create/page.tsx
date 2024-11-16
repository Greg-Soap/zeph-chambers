import type { Metadata } from 'next'
import Client from './client'

export const metadata: Metadata = {
  title: 'Create Loan Agreement',
}

export default function Page() {
  return <Client />
}
