'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { CustomInput } from '@/components/customs/custom-input'
import { powerSchema } from '../../components/schema'
import type { z } from 'zod'
import PageHeader from '../../components/page-header'
import agreementsService from '@/services/agreements.service'
import { useMutation } from '@tanstack/react-query'

type PowerFormData = z.infer<typeof powerSchema>

export default function Client() {
  const router = useRouter()

  const form = useForm<PowerFormData>({
    resolver: zodResolver(powerSchema),
    defaultValues: {
      donorName: '',
      donorAddress: '',
      doneeName: '',
      doneeAddress: '',
      propertyDescription: '',
      files: [],
    },
  })

  const { mutate: createPower, isPending } = useMutation({
    mutationFn: agreementsService.createPowerOfAttorney,
    onSuccess: () => {
      toast.success('Power of Attorney created successfully')
      router.push('/dashboard/agreements?tab=power')
    },
    onError: () => {
      toast.error('Failed to create Power of Attorney')
    },
  })

  const handleSubmit = (data: PowerFormData) => {
    createPower(data)
  }

  return (
    <div className='container max-w-4xl py-6'>
      <PageHeader
        title='Create Power of Attorney'
        description='Fill in the details for the Power of Attorney agreement'
      />

      <FormBase form={form} onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-6'>
          {/* Donor Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Donor Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField form={form} name='donorName' label='Donor Name' showMessage>
                <CustomInput variant='input' placeholder="Enter donor's full name" />
              </FormField>

              <FormField form={form} name='donorAddress' label='Donor Address' showMessage>
                <CustomInput variant='input' placeholder="Enter donor's address" />
              </FormField>
            </div>
          </div>

          {/* Donee Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Donee Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField form={form} name='doneeName' label='Donee Name' showMessage>
                <CustomInput variant='input' placeholder="Enter donee's full name" />
              </FormField>

              <FormField form={form} name='doneeAddress' label='Donee Address' showMessage>
                <CustomInput variant='input' placeholder="Enter donee's address" />
              </FormField>
            </div>
          </div>

          {/* Property Description */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Property Details</h2>
            <FormField
              form={form}
              name='propertyDescription'
              label='Property Description'
              description='Provide detailed description of the property and powers being granted'
              showMessage>
              <CustomInput
                variant='textarea'
                placeholder='Enter detailed property description and scope of powers'
                className='min-h-[120px]'
              />
            </FormField>
          </div>

          {/* File Upload Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Supporting Documents</h2>
            <div className='rounded-lg border border-dashed p-6'>
              <div className='text-center'>
                <p className='text-sm text-muted-foreground'>
                  Upload identification documents and other supporting materials
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
            {isPending ? 'Creating...' : 'Create Power of Attorney'}
          </Button>
        </div>
      </FormBase>
    </div>
  )
}
