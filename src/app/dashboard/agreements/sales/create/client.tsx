'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { CustomInput } from '@/components/customs/custom-input'
import { salesSchema } from '../../components/schema'
import type { z } from 'zod'
import type { SingleSale } from '@/types/agreements'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import agreementsService from '@/services/agreements.service'
import PageHeader from '../../components/page-header'
import { AgreementFileUpload } from '../../components/agreement-file-upload'

type SalesFormData = z.infer<typeof salesSchema>

export default function Client() {
  const router = useRouter()
  const qc = useQueryClient()

  const form = useForm<SalesFormData>({
    resolver: zodResolver(salesSchema),
    defaultValues: {
      vendorName: '',
      purchaserName: '',
      propertyDescription: '',
      amount: '',
      files: [],
    },
  })

  const { mutate: createSale, isPending } = useMutation({
    mutationFn: (data: SingleSale) => agreementsService.createSaleAgreement(data),
    onSuccess: () => {
      toast.success('Sales agreement created successfully')
      qc.invalidateQueries({ queryKey: ['agreements'] })
      router.push('/dashboard/agreements?tab=sales')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create sales agreement')
    },
  })

  const handleSubmit = (data: SalesFormData) => {
    createSale({ ...data, amount: Number(data.amount) })
  }

  return (
    <div className='container max-w-4xl py-6'>
      <PageHeader
        title='Create Sales Agreement'
        description='Fill in the details for the property sales agreement'
      />

      <FormBase form={form} onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            form={form}
            name='vendorName'
            label='Vendor Name'
            description='Individual or organization selling the property'
            showMessage>
            <CustomInput variant='input' placeholder="Enter vendor's name" />
          </FormField>

          <FormField
            form={form}
            name='purchaserName'
            label='Purchaser Name'
            description='Individual or organization buying the property'
            showMessage>
            <CustomInput variant='input' placeholder="Enter purchaser's name" />
          </FormField>

          <FormField
            form={form}
            name='amount'
            label='Purchase Amount'
            description='Amount paid by the purchaser'
            showMessage>
            <CustomInput variant='input' type='number' placeholder='Enter purchase amount' />
          </FormField>
        </div>

        <FormField
          form={form}
          name='propertyDescription'
          label='Property Description'
          description='Detailed description of the property being sold'
          showMessage>
          <CustomInput
            variant='textarea'
            placeholder='Enter detailed property description'
            className='min-h-[100px]'
          />
        </FormField>

        {/* Supporting Documents Section */}
        <AgreementFileUpload />

        <div className='flex justify-end gap-4'>
          <Button type='button' variant='outline' onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Agreement'}
          </Button>
        </div>
      </FormBase>
    </div>
  )
}
