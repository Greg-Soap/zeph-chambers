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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import agreementsService from '@/services/agreements.service'
import type { SingleTenancy } from '@/types/agreements'
import PageHeader from '../../components/page-header'
import { AgreementFileUpload } from '../../components/agreement-file-upload'

type TenancyFormData = z.infer<typeof tenancySchema>

export default function Client() {
  const router = useRouter()
  const qc = useQueryClient()

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
      qc.invalidateQueries({ queryKey: ['agreements'] })
      router.push('/dashboard/agreements?tab=tenancy')
    },
    onError: (error: any) => {
      console.log('error', error)
      toast.error(error?.response?.data?.message || 'Failed to create tenancy agreement')
    },
  })

  const handleSubmit = (data: TenancyFormData) => {
    createTenancy({ ...data, amount: Number(data.amount) })
  }

  console.log({ error: form.formState.errors, data: form.getValues() })

  return (
    <div className='container max-w-4xl py-6'>
      <PageHeader
        title='Create Tenancy Agreement'
        description='Fill in the details for the tenancy agreement'
      />

      <FormBase form={form} onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            form={form}
            name='landlordName'
            label='Landlord Name'
            description='Individual or organization owning the property'
            showMessage>
            <CustomInput variant='input' placeholder="Enter landlord's name" />
          </FormField>

          <FormField
            form={form}
            name='landlordAddress'
            label='Landlord Address'
            description='Current address of the landlord'
            showMessage>
            <CustomInput variant='input' placeholder="Enter landlord's address" />
          </FormField>

          <FormField
            form={form}
            name='tenantName'
            label='Tenant Name'
            description='Individual or organization renting the property'
            showMessage>
            <CustomInput variant='input' placeholder="Enter tenant's name" />
          </FormField>

          <FormField
            form={form}
            name='tenantAddress'
            label='Tenant Address'
            description='Current address of the tenant'
            showMessage>
            <CustomInput variant='input' placeholder="Enter tenant's address" />
          </FormField>

          <FormField
            form={form}
            name='amount'
            label='Rent Amount (₦)'
            description='Amount to be paid by the tenant'
            showMessage>
            <CustomInput variant='number' placeholder='Enter rent amount' />
          </FormField>

          <FormField
            form={form}
            name='duration'
            label='Duration'
            description='Duration of the tenancy agreement'
            showMessage>
            <CustomInput variant='input' placeholder='Enter duration (e.g., 12 months)' />
          </FormField>
        </div>

        <FormField
          form={form}
          name='propertyDescription'
          label='Property Description'
          description='Description of the property being rented'
          showMessage>
          <CustomInput
            variant='textarea'
            placeholder='Enter property description'
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
