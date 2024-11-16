'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { CustomInput } from '@/components/customs/custom-input'
import { loanSchema } from '../../components/schema'
import type { z } from 'zod'
import agreementsService from '@/services/agreements.service'
import { useMutation } from '@tanstack/react-query'
import PageHeader from '../../components/page-header'

type LoanFormData = z.infer<typeof loanSchema>

export default function Client() {
  const router = useRouter()

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

  const { mutate: createLoan, isPending } = useMutation({
    mutationFn: agreementsService.createLoanAgreement,
    onSuccess: () => {
      toast.success('Loan agreement created successfully')
      router.push('/dashboard/agreements?tab=loan')
    },
    onError: () => {
      toast.error('Failed to create loan agreement')
    },
  })

  const handleSubmit = (data: LoanFormData) => {
    createLoan(data)
  }

  return (
    <div className='container max-w-4xl py-6'>
      <PageHeader
        title='Create Loan Agreement'
        description='Fill in the details for the loan agreement'
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
                <CustomInput variant='input' placeholder="Enter lender's name" />
              </FormField>

              <FormField
                form={form}
                name='borrowerName'
                label='Borrower Name'
                description='Individual or organization receiving the loan'
                showMessage>
                <CustomInput variant='input' placeholder="Enter borrower's name" />
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
                />
              </FormField>

              <FormField
                form={form}
                name='duration'
                label='Loan Duration'
                description='Period for loan repayment (e.g., 12 months, 2 years)'
                showMessage>
                <CustomInput variant='input' placeholder='Enter loan duration' />
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
          <Button type='button' variant='outline' onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Loan Agreement'}
          </Button>
        </div>
      </FormBase>
    </div>
  )
}
