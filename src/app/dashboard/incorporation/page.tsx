import type { Metadata } from 'next'
import Incorporation from './client'

export const metadata: Metadata = {
  title: 'Incorporation Services | Zeph Chambers',
  description: 'Business incorporation and registration services',
}

export default function IncorporationPage() {
  return <Incorporation />
}
