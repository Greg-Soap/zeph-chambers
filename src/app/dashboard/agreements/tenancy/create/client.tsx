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
      amount: 0,
      propertyDescription: '',
      duration: '',
      files: [],
    },
  })

  async function handleSubmit(data: TenancyFormData) {
    try {
      // Add your API call here
      console.log(data)
      toast.success('Tenancy agreement created successfully')
      router.push('/dashboard/agreements?tab=tenancy')
    } catch (error) {
      toast.error('Failed to create tenancy agreement')
    }
  }

  return (
    <div className='container max-w-4xl py-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold tracking-tight'>Create Tenancy Agreement</h1>
        <p className='text-muted-foreground'>Fill in the details for the tenancy agreement</p>
      </div>

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

          <FormField form={form} name='amount' label='Rent Amount' showMessage>
            <CustomInput variant='input' type='number' placeholder='Enter rent amount' />
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
          <Button type='submit'>Create Agreement</Button>
        </div>
      </FormBase>
    </div>
  )
}
