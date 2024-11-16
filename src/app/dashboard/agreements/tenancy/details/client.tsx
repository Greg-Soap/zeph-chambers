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
  const tenancyId = searchParams.get('id')

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

  // Delete tenancy mutation
  const { mutate: deleteTenancy, isPending: isDeleting } = useMutation({
    mutationFn: agreementsService.deleteTenancyAgreement,
    onSuccess: () => {
      toast.success('Tenancy agreement deleted successfully')
      router.push('/dashboard/agreements?tab=tenancy')
    },
    onError: () => {
      toast.error('Failed to delete tenancy agreement')
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!tenancy?.data) {
    return <div>Tenancy agreement not found</div>
  }

  const handleEdit = () => {
    router.push(`/dashboard/agreements/tenancy/edit?id=${tenancyId}`)
  }

  const handleDelete = () => {
    if (!tenancyId) return
    deleteTenancy(tenancyId)
  }

  return (
    <div className='container max-w-3xl py-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Tenancy Agreement Details</h1>
          <p className='text-muted-foreground'>View and manage tenancy agreement information</p>
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
            title='Delete Tenancy Agreement'
            description='Are you sure you want to delete this tenancy agreement? This action cannot be undone.'
            confirmText='Delete'
            cancelText='Cancel'
            actionVariant='destructive'
            onConfirm={handleDelete}
          />
        </div>
      </div>

      <div className='space-y-6'>
        {/* Landlord Information */}
        <div className='rounded-lg border p-6 space-y-4'>
          <h2 className='text-lg font-semibold'>Landlord Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Name</p>
              <p className='text-base'>{tenancy.data.landlordName}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Address</p>
              <p className='text-base'>{tenancy.data.landlordAddress}</p>
            </div>
          </div>
        </div>

        {/* Tenant Information */}
        <div className='rounded-lg border p-6 space-y-4'>
          <h2 className='text-lg font-semibold'>Tenant Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Name</p>
              <p className='text-base'>{tenancy.data.tenantName}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Address</p>
              <p className='text-base'>{tenancy.data.tenantAddress}</p>
            </div>
          </div>
        </div>

        {/* Tenancy Details */}
        <div className='rounded-lg border p-6 space-y-4'>
          <h2 className='text-lg font-semibold'>Tenancy Details</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Rent Amount</p>
              <p className='text-base'>₦{tenancy.data.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Duration</p>
              <p className='text-base'>{tenancy.data.duration}</p>
            </div>
          </div>
          <div>
            <p className='text-sm text-muted-foreground'>Property Description</p>
            <p className='text-base whitespace-pre-wrap'>{tenancy.data.propertyDescription}</p>
          </div>
        </div>

        {/* Supporting Documents */}
        <div className='rounded-lg border p-6 space-y-4'>
          {/* <h2 className="text-lg font-semibold">Supporting Documents</h2> */}
          {/* {tenancy.data.files && tenancy.data.files.length > 0 ? ( */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
          {/* {tenancy.data.files.map((file, index) => ( */}
          {/* <div key={index} className="flex items-center gap-2"> */}
          {/* Add file preview/download functionality here */}
          {/* <p className="text-base">{file.name}</p> */}
          {/* </div> */}
          {/* ))} */}
          {/* </div> */}
          {/* ) : ( */}
          {/* <p className="text-sm text-muted-foreground">No documents uploaded</p> */}
          {/* )} */}
        </div>
      </div>
    </div>
  )
}
