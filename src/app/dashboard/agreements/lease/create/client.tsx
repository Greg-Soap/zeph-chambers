'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { CustomInput } from '@/components/customs/custom-input'
import { leaseSchema } from '../../components/schema'
import type { z } from 'zod'
import PageHeader from '../../components/page-header'

type LeaseFormData = z.infer<typeof leaseSchema>

export default function Client() {
  const router = useRouter()

  const form = useForm<LeaseFormData>({
    resolver: zodResolver(leaseSchema),
    defaultValues: {
      leaserName: '',
      leaserAddress: '',
      lesseeName: '',
      lesseeAddress: '',
      propertyDescription: '',
      duration: '',
      amount: 0,
      files: [],
    },
  })

  async function handleSubmit(data: LeaseFormData) {
    try {
      // Add your API call here
      console.log(data)
      toast.success('Lease agreement created successfully')
      router.push('/dashboard/agreements?tab=lease')
    } catch (error) {
      toast.error('Failed to create lease agreement')
    }
  }

  return (
    <div className='container max-w-4xl py-6'>
      <PageHeader
        title='Create Lease Agreement'
        description='Fill in the details for the lease agreement'
      />

      <FormBase form={form} onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-6'>
          {/* Leaser Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Leaser Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='leaserName'
                label='Leaser Name'
                description='Individual or organization leasing out the property'
                showMessage>
                <CustomInput variant='input' placeholder="Enter leaser's name" />
              </FormField>

              <FormField
                form={form}
                name='leaserAddress'
                label='Leaser Address'
                description='Current address of the leaser'
                showMessage>
                <CustomInput variant='input' placeholder="Enter leaser's address" />
              </FormField>
            </div>
          </div>

          {/* Lessee Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Lessee Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='lesseeName'
                label='Lessee Name'
                description='Individual or organization leasing the property'
                showMessage>
                <CustomInput variant='input' placeholder="Enter lessee's name" />
              </FormField>

              <FormField
                form={form}
                name='lesseeAddress'
                label='Lessee Address'
                description='Current address of the lessee'
                showMessage>
                <CustomInput variant='input' placeholder="Enter lessee's address" />
              </FormField>
            </div>
          </div>

          {/* Lease Details Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Lease Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='amount'
                label='Lease Amount'
                description='Monthly lease payment amount'
                showMessage>
                <CustomInput
                  variant='input'
                  type='number'
                  placeholder='Enter lease amount'
                  min={0}
                />
              </FormField>

              <FormField
                form={form}
                name='duration'
                label='Lease Duration'
                description='Period of the lease (e.g., 12 months, 2 years)'
                showMessage>
                <CustomInput variant='input' placeholder='Enter lease duration' />
              </FormField>
            </div>

            <FormField
              form={form}
              name='propertyDescription'
              label='Property Description'
              description='Detailed description of the property being leased'
              showMessage>
              <CustomInput
                variant='textarea'
                placeholder='Enter property description, including address and key features'
                className='min-h-[120px]'
              />
            </FormField>
          </div>

          {/* Supporting Documents Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Supporting Documents</h2>
            <div className='rounded-lg border border-dashed p-6'>
              <div className='text-center'>
                <p className='text-sm text-muted-foreground'>
                  Upload property documentation and other relevant files
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
          <Button type='submit'>Create Lease Agreement</Button>
        </div>
      </FormBase>
    </div>
  )
}
