'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { CustomInput } from '@/components/customs/custom-input'
import { tenancySchema } from '../../components/schema'
import type { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import agreementsService from '@/services/agreements.service'
import type { SingleTenancy } from '@/types/agreements'
import PageHeader from '../../components/page-header'

type TenancyFormData = z.infer<typeof tenancySchema>

export default function Client() {
  const router = useRouter()

  const form = useForm<TenancyFormData>({
    resolver: zodResolver(tenancySchema),
    defaultValues: {
      landlordName: '',
      landlordAddress: '',
      tenantName: '',
      tenantAddress: '',
      amount: '',
      propertyDescription: '',
      duration: '',
      files: [],
    },
  })

  const { mutate: createTenancy, isPending } = useMutation({
    mutationFn: (data: SingleTenancy) => agreementsService.createTenancyAgreement(data),
    onSuccess: () => {
      toast.success('Tenancy agreement created successfully')
      router.push('/dashboard/agreements?tab=tenancy')
    },
    onError: () => {
      toast.error('Failed to create tenancy agreement')
    },
  })

  const handleSubmit = (data: TenancyFormData) => {
    createTenancy({ ...data, amount: Number(data.amount) })
  }

  return (
    <div className='container max-w-4xl py-6'>
      <PageHeader
        title='Create Tenancy Agreement'
        description='Fill in the details for the tenancy agreement'
      />

      <FormBase form={form} onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField form={form} name='landlordName' label='Landlord Name' showMessage>
            <CustomInput variant='input' placeholder="Enter landlord's name" />
          </FormField>

          <FormField form={form} name='landlordAddress' label='Landlord Address' showMessage>
            <CustomInput variant='input' placeholder="Enter landlord's address" />
          </FormField>

          <FormField form={form} name='tenantName' label='Tenant Name' showMessage>
            <CustomInput variant='input' placeholder="Enter tenant's name" />
          </FormField>

          <FormField form={form} name='tenantAddress' label='Tenant Address' showMessage>
            <CustomInput variant='input' placeholder="Enter tenant's address" />
          </FormField>

          <FormField form={form} name='amount' label='Rent Amount (₦)' showMessage>
            <CustomInput variant='number' placeholder='Enter rent amount' />
          </FormField>

          <FormField form={form} name='duration' label='Duration' showMessage>
            <CustomInput variant='input' placeholder='Enter duration (e.g., 12 months)' />
          </FormField>
        </div>

        <FormField form={form} name='propertyDescription' label='Property Description' showMessage>
          <CustomInput
            variant='textarea'
            placeholder='Enter property description'
            className='min-h-[100px]'
          />
        </FormField>

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
