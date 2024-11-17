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
import PageHeader from '../../components/page-header'
import { useMutation } from '@tanstack/react-query'
import agreementsService from '@/services/agreements.service'
import { AgreementFileUpload } from '../../components/agreement-file-upload'

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
      amount: '',
      files: [],
    },
  })

  const { mutate: createDeed, isPending } = useMutation({
    mutationFn: agreementsService.createDeedOfAssignment,
    onSuccess: () => {
      toast.success('Deed of Assignment created successfully')
      router.push('/dashboard/agreements?tab=deed')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create Deed of Assignment')
    },
  })

  const handleSubmit = (data: DeedFormData) => {
    createDeed({ ...data, amount: Number(data.amount) })
  }

  return (
    <div className='container max-w-4xl py-6'>
      <PageHeader
        title='Create Deed of Assignment'
        description='Fill in the details for the Deed of Assignment'
      />

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
          <AgreementFileUpload />
        </div>

        <div className='flex justify-end gap-4 pt-4'>
          <Button type='button' variant='outline' onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Deed of Assignment'}
          </Button>
        </div>
      </FormBase>
    </div>
  )
}
