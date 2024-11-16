import type { Metadata } from 'next'
import Client from './client'

export const metadata: Metadata = {
  title: 'Create Deed of Assignment',
}

export default function Page() {
  return <Client />
}
