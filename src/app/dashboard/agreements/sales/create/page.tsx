import type { Metadata } from 'next'
import Client from './client'

export const metadata: Metadata = {
  title: 'Create Sales Agreement',
}

export default function Page() {
  return <Client />
}