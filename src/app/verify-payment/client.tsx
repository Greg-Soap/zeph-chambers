'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import api from '@/services/http.service'

interface VerificationResponse {
  status: 'success' | 'failed'
  metadata: {
    type: string
  }
}

export default function VerifyPayment() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference')

  const { mutate: verifyPayment, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api.get<VerificationResponse>(`/payments/verify/${reference}`)
      return response.data
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        toast.success('Payment successful')
        router.push(`/dashboard/agreements?tab=${data.metadata.type}`)
      } else {
        toast.error('Payment verification failed')
        router.push('/dashboard')
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Payment verification failed')
      router.push('/dashboard')
    },
  })

  useEffect(() => {
    if (reference) {
      verifyPayment()
    } else {
      toast.error('Invalid payment reference')
      router.push('/dashboard')
    }
  }, [reference, verifyPayment, router])

  return (
    <div className='flex min-h-screen items-center justify-center bg-background'>
      <div className='w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg'>
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-bold tracking-tight'>Verifying Payment</h1>
          <p className='text-sm text-muted-foreground'>
            {isPending
              ? 'Please wait while we verify your payment...'
              : 'Redirecting you to dashboard...'}
          </p>
        </div>
      </div>
    </div>
  )
}
