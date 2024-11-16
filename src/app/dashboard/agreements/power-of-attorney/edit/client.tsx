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
import { powerSchema } from '../../components/schema'
import agreementsService from '@/services/agreements.service'
import type { z } from 'zod'
import MiniLoader from '@/components/mini-loader'
import PageHeader from '../../components/page-header'

type PowerFormData = z.infer<typeof powerSchema>

export default function Client() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const powerId = searchParams.get('id')

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

  // Fetch power of attorney data
  const { data: power, isLoading } = useQuery({
    queryKey: ['power', powerId],
    queryFn: () => {
      if (!powerId) throw new Error('No power of attorney ID provided')
      return agreementsService.getPowerOfAttorney(powerId)
    },
    enabled: !!powerId,
    retry: false,
  })

  // Update power of attorney mutation
  const { mutate: updatePower, isPending: isUpdating } = useMutation({
    mutationFn: agreementsService.updatePowerOfAttorney,
    onSuccess: () => {
      toast.success('Power of Attorney updated successfully')
      router.push('/dashboard/agreements?tab=power')
    },
    onError: () => {
      toast.error('Failed to update Power of Attorney')
    },
  })

  // Set form values when power of attorney data is fetched
  useEffect(() => {
    if (power?.data) {
      form.reset({
        donorName: power.data.donorName,
        donorAddress: power.data.donorAddress,
        doneeName: power.data.doneeName,
        doneeAddress: power.data.doneeAddress,
        propertyDescription: power.data.propertyDescription,
        files: [], // Add existing files if any
      })
    }
  }, [power?.data, form])

  // Handle form submission
  async function handleSubmit(data: PowerFormData) {
    if (!powerId) return

    updatePower({
      ...data,
      id: powerId,
    })
  }

  // Handle missing power of attorney ID
  if (!powerId) {
    router.push('/dashboard/agreements?tab=power')
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
        title='Edit Power of Attorney'
        description='Update the details of the Power of Attorney'
      />

      <FormBase form={form} onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-6'>
          {/* Donor Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Donor Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='donorName'
                label='Donor Name'
                description='Individual granting the power of attorney'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter donor's name"
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='donorAddress'
                label='Donor Address'
                description='Current address of the donor'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter donor's address"
                  disabled={isUpdating}
                />
              </FormField>
            </div>
          </div>

          {/* Donee Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Donee Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='doneeName'
                label='Donee Name'
                description='Individual receiving the power of attorney'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter donee's name"
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='doneeAddress'
                label='Donee Address'
                description='Current address of the donee'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter donee's address"
                  disabled={isUpdating}
                />
              </FormField>
            </div>
          </div>

          {/* Property and Powers Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Property and Powers</h2>
            <FormField
              form={form}
              name='propertyDescription'
              label='Description of Property and Powers'
              description='Detailed description of the property and powers being granted'
              showMessage>
              <CustomInput
                variant='textarea'
                placeholder='Enter detailed description of property and powers being granted'
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
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            disabled={isUpdating}>
            Cancel
          </Button>
          <Button type='submit' disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update Power of Attorney'}
          </Button>
        </div>
      </FormBase>
    </div>
  )
}
