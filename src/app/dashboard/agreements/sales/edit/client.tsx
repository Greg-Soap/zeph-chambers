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
import { salesSchema } from '../../components/schema'
import agreementsService from '@/services/agreements.service'
import type { z } from 'zod'

type SalesFormData = z.infer<typeof salesSchema>

export default function Client() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const saleId = searchParams.get('id')

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

  // Fetch sale agreement data
  const { data: sale, isLoading } = useQuery({
    queryKey: ['sale', saleId],
    queryFn: () => {
      if (!saleId) throw new Error('No sale ID provided')
      return agreementsService.getSaleAgreement(saleId)
    },
    enabled: !!saleId,
    retry: false,
  })

  // Update sale agreement mutation
  const { mutate: updateSale, isPending: isUpdating } = useMutation({
    mutationFn: agreementsService.updateSaleAgreement,
    onSuccess: () => {
      toast.success('Sale agreement updated successfully')
      router.push('/dashboard/agreements?tab=sale')
    },
    onError: () => {
      toast.error('Failed to update sale agreement')
    },
  })

  // Set form values when sale data is fetched
  useEffect(() => {
    if (sale?.data) {
      form.reset({
        vendorName: sale.data.vendorName,
        purchaserName: sale.data.purchaserName,
        propertyDescription: sale.data.propertyDescription,
        amount: sale.data.amount,
        files: [], // Add existing files if any
      })
    }
  }, [sale?.data, form])

  // Handle form submission
  async function handleSubmit(data: SalesFormData) {
    if (!saleId) return

    updateSale({
      ...data,
      id: saleId,
    })
  }

  // Handle missing sale ID
  if (!saleId) {
    router.push('/dashboard/agreements?tab=sale')
    return null
  }

  if (isLoading) {
    return <div>Loading...</div> // Consider using a proper loading component
  }

  return (
    <div className='container max-w-4xl py-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold tracking-tight'>Edit Sale Agreement</h1>
        <p className='text-muted-foreground'>Update the details of the sale agreement</p>
      </div>

      <FormBase form={form} onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-6'>
          {/* Parties Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Parties Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                form={form}
                name='vendorName'
                label='Vendor Name'
                description='Individual or organization selling the property'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter vendor's name"
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='purchaserName'
                label='Purchaser Name'
                description='Individual or organization buying the property'
                showMessage>
                <CustomInput
                  variant='input'
                  placeholder="Enter purchaser's name"
                  disabled={isUpdating}
                />
              </FormField>
            </div>
          </div>

          {/* Sale Details Section */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Sale Details</h2>
            <div className='grid grid-cols-1 gap-4'>
              <FormField
                form={form}
                name='amount'
                label='Sale Amount'
                description='Total purchase price of the property'
                showMessage>
                <CustomInput
                  variant='input'
                  type='number'
                  placeholder='Enter sale amount'
                  min={0}
                  disabled={isUpdating}
                />
              </FormField>

              <FormField
                form={form}
                name='propertyDescription'
                label='Property Description'
                description='Detailed description of the property being sold'
                showMessage>
                <CustomInput
                  variant='textarea'
                  placeholder='Enter detailed property description including location, boundaries, and specifications'
                  className='min-h-[120px]'
                  disabled={isUpdating}
                />
              </FormField>
            </div>
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
            {isUpdating ? 'Updating...' : 'Update Sale Agreement'}
          </Button>
        </div>
      </FormBase>
    </div>
  )
}