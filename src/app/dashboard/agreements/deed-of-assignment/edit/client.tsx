'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { FormBase, FormField } from '@/components/customs/custom-form'
import { CustomInput } from '@/components/customs/custom-input'
import { deedSchema } from '../../components/schema'
import agreementsService from '@/services/agreements.service'
import type { z } from 'zod'
import MiniLoader from '@/components/mini-loader'
import PageHeader from '../../components/page-header'

type DeedFormData = z.infer<typeof deedSchema>

export default function Client() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const deedId = searchParams.get('id')

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

  // Fetch deed data
  const { data: deed, isLoading } = useQuery({
    queryKey: ['deed', deedId],
    queryFn: () => {
      if (!deedId) throw new Error('No deed ID provided')
      return agreementsService.getDeedOfAssignment(deedId)
    },
    enabled: !!deedId,
    retry: false,
  })

  // Update deed mutation
  const { mutate: updateDeed, isPending: isUpdating } = useMutation({
    mutationFn: agreementsService.updateDeedOfAssignment,
    onSuccess: () => {
      toast.success('Deed of Assignment updated successfully')
      router.push('/dashboard/agreements?tab=deed')
    },
    onError: () => {
      toast.error('Failed to update Deed of Assignment')
    },
  })

  // Set form values when deed data is fetched
  useEffect(() => {
    if (deed?.data) {
      form.reset({
        assignorName: deed.data.assignorName,
        assignorAddress: deed.data.assignorAddress,
        assigneeName: deed.data.assigneeName,
        assigneeAddress: deed.data.assigneeAddress,
        propertyDescription: deed.data.propertyDescription,
        duration: deed.data.duration,
        amount: deed.data.amount,
        files: [], // Add existing files if any
      })
    }
  }, [deed?.data, form])

  // Handle form submission
  async function handleSubmit(data: DeedFormData) {
    if (!deedId) return

    updateDeed({
      ...data,
      id: deedId,
    })
  }

  // Handle missing deed ID
  if (!deedId) {
    router.push('/dashboard/agreements?tab=deed')
    return null
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <MiniLoader />
      </div>
    )
  }

  return (
    <div className='container max-w-4xl py-6'>
      <PageHeader
        title='Edit Deed of Assignment'
        description='Update the details of the Deed of Assignment'
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
                <CustomInput
                  variant='input'
                  placeholder="Enter assignor's name"
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='assignorAddress'
                label='Assignor Address'
                description='Current address of the assignor'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter assignor's address"
                  disabled={isUpdating}
                />
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
                <CustomInput
                  variant='input'
                  placeholder="Enter assignee's name"
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='assigneeAddress'
                label='Assignee Address'
                description='Current address of the assignee'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter assignee's address"
                  disabled={isUpdating}
                />
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
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='duration'
                label='Duration'
                description='Duration of the assignment (if applicable)'
                showMessage>
                <CustomInput variant='input' placeholder='Enter duration' disabled={isUpdating} />
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
                disabled={isUpdating}
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
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            disabled={isUpdating}>
            Cancel
          </Button>
          <Button type='submit' disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update Deed of Assignment'}
          </Button>
        </div>
      </FormBase>
    </div>
  )
}
