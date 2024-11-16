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

type SalesFormData = z.infer<typeof salesSchema>

export default function Client() {
  const router = useRouter()

  const form = useForm<SalesFormData>({
    resolver: zodResolver(salesSchema),
    defaultValues: {
      vendorName: '',
      purchaserName: '',
      propertyDescription: '',
      amount: 0,
      files: [],
    },
  })

  async function handleSubmit(data: SalesFormData) {
    try {
      // Add your API call here
      console.log(data)
      toast.success('Sales agreement created successfully')
      router.push('/dashboard/agreements?tab=sales')
    } catch (error) {
      toast.error('Failed to create sales agreement')
    }
  }

  return (
    <div className='container max-w-4xl py-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold tracking-tight'>Create Sales Agreement</h1>
        <p className='text-muted-foreground'>
          Fill in the details for the property sales agreement
        </p>
      </div>

      <FormBase form={form} onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField form={form} name='vendorName' label='Vendor Name' showMessage>
            <CustomInput variant='input' placeholder="Enter vendor's name" />
          </FormField>

          <FormField form={form} name='purchaserName' label='Purchaser Name' showMessage>
            <CustomInput variant='input' placeholder="Enter purchaser's name" />
          </FormField>

          <FormField form={form} name='amount' label='Purchase Amount' showMessage>
            <CustomInput variant='input' type='number' placeholder='Enter purchase amount' />
          </FormField>
        </div>

        <FormField form={form} name='propertyDescription' label='Property Description' showMessage>
          <CustomInput
            variant='textarea'
            placeholder='Enter detailed property description'
            className='min-h-[100px]'
          />
        </FormField>

        {/* File Upload Section - To be implemented */}
        <div className='rounded-lg border border-dashed p-6'>
          <div className='text-center'>
            <p className='text-sm text-muted-foreground'>
              Drag and drop files here or click to select files
            </p>
            <p className='text-xs text-muted-foreground mt-1'>Maximum file size: 10MB</p>
          </div>
        </div>

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
