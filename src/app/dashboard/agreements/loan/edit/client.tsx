'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { CustomInput } from '@/components/customs/custom-input'
import { loanSchema } from '../../components/schema'
import agreementsService from '@/services/agreements.service'
import type { z } from 'zod'
import MiniLoader from '@/components/mini-loader'
import PageHeader from '../../components/page-header'

type LoanFormData = z.infer<typeof loanSchema>

export default function Client() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const loanId = searchParams.get('id')

  const form = useForm<LoanFormData>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      lenderName: '',
      borrowerName: '',
      interestRate: 0,
      duration: '',
      amount: 0,
      files: [],
    },
  })

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

  // Update loan mutation
  const { mutate: updateLoan, isPending: isUpdating } = useMutation({
    mutationFn: agreementsService.updateLoanAgreement,
    onSuccess: () => {
      toast.success('Loan agreement updated successfully')
      router.push('/dashboard/agreements?tab=loan')
    },
    onError: () => {
      toast.error('Failed to update loan agreement')
    },
  })

  // Set form values when loan data is fetched
  useEffect(() => {
    if (loan?.data) {
      form.reset({
        lenderName: loan.data.lenderName,
        borrowerName: loan.data.borrowerName,
        interestRate: loan.data.interestRate,
        duration: loan.data.duration,
        amount: loan.data.amount,
        files: [], // Add existing files if any
      })
    }
  }, [loan?.data, form])

  // Handle form submission
  async function handleSubmit(data: LoanFormData) {
    if (!loanId) return

    updateLoan({
      ...data,
      id: loanId,
    })
  }

  // Handle missing loan ID
  if (!loanId) {
    router.push('/dashboard/agreements?tab=loan')
    return null
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <MiniLoader />
      </div>
    )
  }

  return (
    <div className='container max-w-4xl py-6'>
      <PageHeader
        title='Edit Loan Agreement'
        description='Update the details of the loan agreement'
      />

      <FormBase form={form} onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-6'>
          {/* Parties Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Parties Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='lenderName'
                label='Lender Name'
                description='Individual or organization providing the loan'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter lender's name"
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='borrowerName'
                label='Borrower Name'
                description='Individual or organization receiving the loan'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter borrower's name"
                  disabled={isUpdating}
                />
              </FormField>
            </div>
          </div>

          {/* Loan Details Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Loan Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='amount'
                label='Loan Amount'
                description='Total amount to be borrowed'
                showMessage>
                <CustomInput
                  variant='input'
                  type='number'
                  placeholder='Enter loan amount'
                  min={0}
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='interestRate'
                label='Interest Rate (%)'
                description='Annual interest rate'
                showMessage>
                <CustomInput
                  variant='input'
                  type='number'
                  placeholder='Enter interest rate'
                  step='0.01'
                  min={0}
                  max={100}
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='duration'
                label='Loan Duration'
                description='Period for loan repayment (e.g., 12 months, 2 years)'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder='Enter loan duration'
                  disabled={isUpdating}
                />
              </FormField>
            </div>
          </div>

          {/* Supporting Documents Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Supporting Documents</h2>
            <div className='rounded-lg border border-dashed p-6'>
              <div className='text-center'>
                <p className='text-sm text-muted-foreground'>
                  Upload any supporting documents (ID, proof of income, etc.)
                </p>
                <p className='text-xs text-muted-foreground mt-1'>
                  Accepted formats: PDF, JPG, PNG (Max: 10MB per file)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-4 pt-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            disabled={isUpdating}>
            Cancel
          </Button>
          <Button type='submit' disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update Loan Agreement'}
          </Button>
        </div>
      </FormBase>
    </div>
  )
}
