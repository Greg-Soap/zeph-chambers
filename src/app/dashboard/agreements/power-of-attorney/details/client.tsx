'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import CustomDialog from '@/components/customs/custom-dialog'
import agreementsService from '@/services/agreements.service'

export default function Client() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const powerId = searchParams.get('id')

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

  // Delete power of attorney mutation
  const { mutate: deletePower, isPending: isDeleting } = useMutation({
    mutationFn: agreementsService.deletePowerOfAttorney,
    onSuccess: () => {
      toast.success('Power of Attorney deleted successfully')
      router.push('/dashboard/agreements?tab=power')
    },
    onError: () => {
      toast.error('Failed to delete Power of Attorney')
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!power?.data) {
    return <div>Power of Attorney not found</div>
  }

  const handleEdit = () => {
    router.push(`/dashboard/agreements/power-of-attorney/edit?id=${powerId}`)
  }

  const handleDelete = () => {
    if (!powerId) return
    deletePower(powerId)
  }

  return (
    <div className='container max-w-3xl py-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Power of Attorney Details</h1>
          <p className='text-muted-foreground'>View and manage power of attorney information</p>
        </div>
        <div className='flex gap-3'>
          <Button variant='outline' size='icon' onClick={handleEdit} disabled={isDeleting}>
            <Pencil className='h-4 w-4' />
          </Button>
          <CustomDialog
            trigger={
              <Button variant='destructive' size='icon' disabled={isDeleting}>
                <Trash2 className='h-4 w-4' />
              </Button>
            }
            title='Delete Power of Attorney'
            description='Are you sure you want to delete this power of attorney? This action cannot be undone.'
            confirmText='Delete'
            cancelText='Cancel'
            actionVariant='destructive'
            onConfirm={handleDelete}
          />
        </div>
      </div>

      <div className='space-y-6'>
        {/* Donor Information */}
        <div className='rounded-lg border p-6 space-y-4'>
          <h2 className='text-lg font-semibold'>Donor Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Name</p>
              <p className='text-base'>{power.data.donorName}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Address</p>
              <p className='text-base'>{power.data.donorAddress}</p>
            </div>
          </div>
        </div>

        {/* Donee Information */}
        <div className='rounded-lg border p-6 space-y-4'>
          <h2 className='text-lg font-semibold'>Donee Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Name</p>
              <p className='text-base'>{power.data.doneeName}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Address</p>
              <p className='text-base'>{power.data.doneeAddress}</p>
            </div>
          </div>
        </div>

        {/* Powers and Property */}
        <div className='rounded-lg border p-6 space-y-4'>
          <h2 className='text-lg font-semibold'>Powers and Property</h2>
          <div>
            <p className='text-sm text-muted-foreground'>Description</p>
            <p className='text-base whitespace-pre-wrap'>{power.data.propertyDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}