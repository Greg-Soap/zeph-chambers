'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import CustomDialog from '@/components/customs/custom-dialog'
import agreementsService from '@/services/agreements.service'
import MiniLoader from '@/components/mini-loader'
import PageHeader from '../../components/page-header'
import SupportingDocuments from '../../components/supporting-documents'
import LoadingOverlay from '@/components/loading-overlay'

export default function Client() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const leaseId = searchParams.get('id')
  const qc = useQueryClient()

  // Fetch lease data
  const { data: lease, isLoading } = useQuery({
    queryKey: ['lease', leaseId],
    queryFn: () => {
      if (!leaseId) throw new Error('No lease ID provided')
      return agreementsService.getLeaseAgreement(leaseId)
    },
    enabled: !!leaseId,
    retry: false,
  })

  // Delete lease mutation
  const { mutate: deleteLease, isPending: isDeleting } = useMutation({
    mutationFn: agreementsService.deleteLeaseAgreement,
    onSuccess: () => {
      toast.success('Lease agreement deleted successfully')
      qc.invalidateQueries({ queryKey: ['agreements'] })
      router.push('/dashboard/agreements?tab=lease')
    },
    onError: () => {
      toast.error('Failed to delete lease agreement')
    },
  })

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <MiniLoader />
      </div>
    )
  }

  if (!lease?.data) {
    return <div>Lease agreement not found</div>
  }

  const handleEdit = () => {
    router.push(`/dashboard/agreements/lease/edit?id=${leaseId}`)
  }

  const handleDelete = () => {
    if (!leaseId) return
    deleteLease(leaseId)
  }

  // Calculate total lease value
  const calculateTotalLeaseValue = () => {
    const monthlyAmount = lease.data.amount
    // Extract number from duration string (assuming format like "12 months" or "2 years")
    const durationMatch = lease.data.duration.match(/\d+/)
    const durationNumber = durationMatch ? Number.parseInt(durationMatch[0]) : 0
    const isYears = lease.data.duration.toLowerCase().includes('year')

    const totalMonths = isYears ? durationNumber * 12 : durationNumber
    return monthlyAmount * totalMonths
  }

  return (
    <>
      <LoadingOverlay isLoading={isDeleting} />
      <div className='container max-w-3xl py-6'>
        <div className='flex items-center justify-between mb-6'>
          <PageHeader
            title='Lease Agreement Details'
            description='View and manage lease agreement information'
          />
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
              title='Delete Lease Agreement'
              description='Are you sure you want to delete this lease agreement? This action cannot be undone.'
              confirmText='Delete'
              cancelText='Cancel'
              actionVariant='destructive'
              onConfirm={handleDelete}
            />
          </div>
        </div>

        <div className='space-y-6'>
          {/* Leaser Information */}
          <div className='rounded-lg border p-6 space-y-4'>
            <h2 className='text-lg font-semibold'>Leaser Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Name</p>
                <p className='text-base'>{lease?.data?.leaserName}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Address</p>
                <p className='text-base'>{lease?.data?.leaserAddress}</p>
              </div>
            </div>
          </div>

          {/* Lessee Information */}
          <div className='rounded-lg border p-6 space-y-4'>
            <h2 className='text-lg font-semibold'>Lessee Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Name</p>
                <p className='text-base'>{lease?.data?.lesseeName}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Address</p>
                <p className='text-base'>{lease?.data?.lesseeAddress}</p>
              </div>
            </div>
          </div>

          {/* Lease Terms */}
          <div className='rounded-lg border p-6 space-y-4'>
            <h2 className='text-lg font-semibold'>Lease Terms</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Monthly Amount</p>
                <p className='text-base font-medium'>₦{lease?.data?.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Duration</p>
                <p className='text-base'>{lease?.data?.duration}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Total Lease Value</p>
                <p className='text-base font-medium'>
                  ₦{calculateTotalLeaseValue().toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className='rounded-lg border p-6 space-y-4'>
            <h2 className='text-lg font-semibold'>Property Details</h2>
            <div>
              <p className='text-sm text-muted-foreground'>Description</p>
              <p className='text-base whitespace-pre-wrap'>{lease?.data?.propertyDescription}</p>
            </div>
          </div>

          {/* Lease User */}
          {lease?.data?.user && (
            <div className='rounded-lg border p-6 space-y-4'>
              <h2 className='text-lg font-semibold'>Posted By</h2>
              <p className='text-base'>
                <span className='font-medium'>Name:</span> {lease?.data?.user?.fullName}
              </p>
              <p className='text-sm text-muted-foreground'>
                <span className='font-medium'>Email:</span> {lease?.data?.user?.email}
              </p>
            </div>
          )}

          {/* Supporting Documents */}
          <SupportingDocuments files={lease?.data?.uploadedFiles || []} />
        </div>
      </div>
    </>
  )
}
