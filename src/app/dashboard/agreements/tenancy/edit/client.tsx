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
import { tenancySchema } from '../../components/schema'
import agreementsService from '@/services/agreements.service'
import type { z } from 'zod'

type TenancyFormData = z.infer<typeof tenancySchema>

export default function Client() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tenancyId = searchParams.get('id')

  const form = useForm<TenancyFormData>({
    resolver: zodResolver(tenancySchema),
    defaultValues: {
      landlordName: '',
      landlordAddress: '',
      tenantName: '',
      tenantAddress: '',
      propertyDescription: '',
      duration: '',
      amount: 0,
      files: [],
    },
  })

  // Fetch tenancy data
  const { data: tenancy, isLoading } = useQuery({
    queryKey: ['tenancy', tenancyId],
    queryFn: () => {
      if (!tenancyId) throw new Error('No tenancy ID provided')
      return agreementsService.getTenancyAgreement(tenancyId)
    },
    enabled: !!tenancyId,
    retry: false,
  })

  // Update tenancy mutation
  const { mutate: updateTenancy, isPending: isUpdating } = useMutation({
    mutationFn: agreementsService.updateTenancyAgreement,
    onSuccess: () => {
      toast.success('Tenancy agreement updated successfully')
      router.push('/dashboard/agreements?tab=tenancy')
    },
    onError: () => {
      toast.error('Failed to update tenancy agreement')
    },
  })

  // Set form values when tenancy data is fetched
  useEffect(() => {
    if (tenancy?.data) {
      form.reset({
        landlordName: tenancy.data.landlordName,
        landlordAddress: tenancy.data.landlordAddress,
        tenantName: tenancy.data.tenantName,
        tenantAddress: tenancy.data.tenantAddress,
        propertyDescription: tenancy.data.propertyDescription,
        duration: tenancy.data.duration,
        amount: tenancy.data.amount,
        files: [], // Add existing files if any
      })
    }
  }, [tenancy?.data, form])

  // Handle form submission
  async function handleSubmit(data: TenancyFormData) {
    if (!tenancyId) return

    updateTenancy({
      ...data,
      id: tenancyId,
    })
  }

  // Handle missing tenancy ID
  if (!tenancyId) {
    router.push('/dashboard/agreements?tab=tenancy')
    return null
  }

  if (isLoading) {
    return <div>Loading...</div> // Consider using a proper loading component
  }

  return (
    <div className='container max-w-4xl py-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold tracking-tight'>Edit Tenancy Agreement</h1>
        <p className='text-muted-foreground'>Update the details of the tenancy agreement</p>
      </div>

      <FormBase form={form} onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-6'>
          {/* Landlord Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Landlord Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='landlordName'
                label='Landlord Name'
                description='Individual or organization owning the property'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter landlord's name"
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='landlordAddress'
                label='Landlord Address'
                description='Current address of the landlord'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter landlord's address"
                  disabled={isUpdating}
                />
              </FormField>
            </div>
          </div>

          {/* Tenant Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Tenant Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='tenantName'
                label='Tenant Name'
                description='Individual or organization renting the property'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter tenant's name"
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='tenantAddress'
                label='Tenant Address'
                description='Current address of the tenant'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter tenant's address"
                  disabled={isUpdating}
                />
              </FormField>
            </div>
          </div>

          {/* Tenancy Details Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Tenancy Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='amount'
                label='Rent Amount'
                description='Monthly rent payment amount'
                showMessage>
                <CustomInput
                  variant='input'
                  type='number'
                  placeholder='Enter rent amount'
                  min={0}
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='duration'
                label='Tenancy Duration'
                description='Period of the tenancy (e.g., 12 months, 2 years)'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder='Enter tenancy duration'
                  disabled={isUpdating}
                />
              </FormField>
            </div>

            <FormField
              form={form}
              name='propertyDescription'
              label='Property Description'
              description='Detailed description of the property being rented'
              showMessage>
              <CustomInput
                variant='textarea'
                placeholder='Enter property description, including address and key features'
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
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            disabled={isUpdating}>
            Cancel
          </Button>
          <Button type='submit' disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update Tenancy Agreement'}
          </Button>
        </div>
      </FormBase>
    </div>
  )
}
