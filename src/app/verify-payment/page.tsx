import { Suspense } from 'react'
import MiniLoader from '@/components/mini-loader'
import VerifyPayment from './client'

export const metadata = {
  title: 'Verify Payment',
  description: 'Verifying your payment status',
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center h-screen w-full'>
          <MiniLoader />
        </div>
      }>
      <VerifyPayment />
    </Suspense>
  )
}
