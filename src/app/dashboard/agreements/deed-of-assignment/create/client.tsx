'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { CustomInput } from '@/components/customs/custom-input'
import { deedSchema } from '../../components/schema'
import type { z } from 'zod'

type DeedFormData = z.infer<typeof deedSchema>

export default function Client() {
  const router = useRouter()

  const form = useForm<DeedFormData>({
    resolver: zodResolver(deedSchema),
    defaultValues: {
      assignorName: '',
      assignorAddress: '',
      assigneeName: '',
      assigneeAddress: '',
      propertyDescription: '',
      duration: '',
      amount: 0,
      files: [],
    },
  })

  async function handleSubmit(data: DeedFormData) {
    try {
      // Add your API call here
      console.log(data)
      toast.success('Deed of Assignment created successfully')
      router.push('/dashboard/agreements?tab=deed')
    } catch (error) {
      toast.error('Failed to create Deed of Assignment')
    }
  }

  return (
    <div className='container max-w-4xl py-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold tracking-tight'>Create Deed of Assignment</h1>
        <p className='text-muted-foreground'>Fill in the details for the Deed of Assignment</p>
      </div>

      <FormBase form={form} onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-6'>
          {/* Assignor Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Assignor Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='assignorName'
                label='Assignor Name'
                description='Individual or entity transferring the property rights'
                showMessage>
                <CustomInput variant='input' placeholder="Enter assignor's name" />
              </FormField>

              <FormField
                form={form}
                name='assignorAddress'
                label='Assignor Address'
                description='Current address of the assignor'
                showMessage>
                <CustomInput variant='input' placeholder="Enter assignor's address" />
              </FormField>
            </div>
          </div>

          {/* Assignee Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Assignee Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='assigneeName'
                label='Assignee Name'
                description='Individual or entity receiving the property rights'
                showMessage>
                <CustomInput variant='input' placeholder="Enter assignee's name" />
              </FormField>

              <FormField
                form={form}
                name='assigneeAddress'
                label='Assignee Address'
                description='Current address of the assignee'
                showMessage>
                <CustomInput variant='input' placeholder="Enter assignee's address" />
              </FormField>
            </div>
          </div>

          {/* Assignment Details Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Assignment Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='amount'
                label='Assignment Amount'
                description='Value of the assignment'
                showMessage>
                <CustomInput
                  variant='input'
                  type='number'
                  placeholder='Enter assignment amount'
                  min={0}
                />
              </FormField>

              <FormField
                form={form}
                name='duration'
                label='Duration'
                description='Duration of the assignment (if applicable)'
                showMessage>
                <CustomInput variant='input' placeholder='Enter duration' />
              </FormField>
            </div>

            <FormField
              form={form}
              name='propertyDescription'
              label='Property Description'
              description='Detailed description of the property being assigned'
              showMessage>
              <CustomInput
                variant='textarea'
                placeholder='Enter detailed property description including location, boundaries, and any relevant details'
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
                  Upload property documents, title deeds, and other relevant files
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
          <Button type='submit'>Create Deed of Assignment</Button>
        </div>
      </FormBase>
    </div>
  )
}
