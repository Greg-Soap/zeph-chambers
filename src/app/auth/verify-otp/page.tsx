
import { Suspense } from 'react'
import VerifyOtp from './client'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtp />
    </Suspense>
  )
}
