'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import CustomDialog from '@/components/customs/custom-dialog'
import agreementsService from '@/services/agreements.service'

export default function Client() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const loanId = searchParams.get('id')

  // Fetch loan data
  const { data: loan, isLoading } = useQuery({
    queryKey: ['loan', loanId],
    queryFn: () => {
      if (!loanId) throw new Error('No loan ID provided')
      return agreementsService.getLoanAgreement(loanId)
    },
    enabled: !!loanId,
    retry: false,
  })

  // Delete loan mutation
  const { mutate: deleteLoan, isPending: isDeleting } = useMutation({
    mutationFn: agreementsService.deleteLoanAgreement,
    onSuccess: () => {
      toast.success('Loan agreement deleted successfully')
      router.push('/dashboard/agreements?tab=loan')
    },
    onError: () => {
      toast.error('Failed to delete loan agreement')
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!loan?.data) {
    return <div>Loan agreement not found</div>
  }

  const handleEdit = () => {
    router.push(`/dashboard/agreements/loan/edit?id=${loanId}`)
  }

  const handleDelete = () => {
    if (!loanId) return
    deleteLoan(loanId)
  }

  // Calculate monthly payment (simple calculation for display)
  const calculateMonthlyPayment = () => {
    const principal = loan.data.amount
    const rate = loan.data.interestRate / 100 / 12 // Monthly interest rate
    const durationInMonths = 12 // Assuming duration is in years, multiply by 12

    const monthlyPayment =
      (principal * rate * (1 + rate) ** durationInMonths) / ((1 + rate) ** durationInMonths - 1)

    return Number.isNaN(monthlyPayment) ? 0 : monthlyPayment
  }

  return (
    <div className='container max-w-3xl py-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Loan Agreement Details</h1>
          <p className='text-muted-foreground'>View and manage loan agreement information</p>
        </div>
        <div className='flex gap-3'>
          <Button variant='outline' size='icon' onClick={handleEdit} disabled={isDeleting}>
            <Pencil className='h-4 w-4' />
          </Button>
          <CustomDialog
            trigger={
              <Button variant='destructive' size='icon' disabled={isDeleting}>
                <Trash2 className='h-4 w-4' />
              </Button>
            }
            title='Delete Loan Agreement'
            description='Are you sure you want to delete this loan agreement? This action cannot be undone.'
            confirmText='Delete'
            cancelText='Cancel'
            actionVariant='destructive'
            onConfirm={handleDelete}
          />
        </div>
      </div>

      <div className='space-y-6'>
        {/* Parties Information */}
        <div className='rounded-lg border p-6 space-y-4'>
          <h2 className='text-lg font-semibold'>Parties Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Lender</p>
              <p className='text-base'>{loan.data.lenderName}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Borrower</p>
              <p className='text-base'>{loan.data.borrowerName}</p>
            </div>
          </div>
        </div>

        {/* Loan Details */}
        <div className='rounded-lg border p-6 space-y-4'>
          <h2 className='text-lg font-semibold'>Loan Details</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Principal Amount</p>
              <p className='text-base font-medium'>₦{loan.data.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Interest Rate</p>
              <p className='text-base'>{loan.data.interestRate}% per annum</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Duration</p>
              <p className='text-base'>{loan.data.duration}</p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className='rounded-lg border p-6 space-y-4'>
          <h2 className='text-lg font-semibold'>Payment Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Estimated Monthly Payment</p>
              <p className='text-base font-medium'>
                ₦
                {calculateMonthlyPayment().toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Total Interest</p>
              <p className='text-base'>
                ₦
                {(calculateMonthlyPayment() * 12 - loan.data.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
