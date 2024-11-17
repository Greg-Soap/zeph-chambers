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
  const deedId = searchParams.get('id')
  const qc = useQueryClient()
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

  // Delete deed mutation
  const { mutate: deleteDeed, isPending: isDeleting } = useMutation({
    mutationFn: agreementsService.deleteDeedOfAssignment,
    onSuccess: () => {
      toast.success('Deed of Assignment deleted successfully')
      qc.invalidateQueries({ queryKey: ['agreements'] })
      router.push('/dashboard/agreements?tab=deed')
    },
    onError: () => {
      toast.error('Failed to delete Deed of Assignment')
    },
  })

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <MiniLoader />
      </div>
    )
  }

  if (!deed?.data) {
    return <div>Deed of Assignment not found</div>
  }

  const handleEdit = () => {
    router.push(`/dashboard/agreements/deed-of-assignment/edit?id=${deedId}`)
  }

  const handleDelete = () => {
    if (!deedId) return
    deleteDeed(deedId)
  }

  return (
    <>
      <LoadingOverlay isLoading={isDeleting} />
      <div className='container max-w-3xl py-6'>
        <div className='flex items-center justify-between mb-6'>
          <PageHeader
            title='Deed of Assignment Details'
            description='View and manage deed of assignment information'
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
              title='Delete Deed of Assignment'
              description='Are you sure you want to delete this deed of assignment? This action cannot be undone.'
              confirmText='Delete'
              cancelText='Cancel'
              actionVariant='destructive'
              onConfirm={handleDelete}
            />
          </div>
        </div>

        <div className='space-y-6'>
          {/* Assignor Information */}
          <div className='rounded-lg border p-6 space-y-4'>
            <h2 className='text-lg font-semibold'>Assignor Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Name</p>
                <p className='text-base'>{deed?.data?.assignorName}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Address</p>
                <p className='text-base'>{deed?.data?.assignorAddress}</p>
              </div>
            </div>
          </div>

          {/* Assignee Information */}
          <div className='rounded-lg border p-6 space-y-4'>
            <h2 className='text-lg font-semibold'>Assignee Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Name</p>
                <p className='text-base'>{deed?.data?.assigneeName}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Address</p>
                <p className='text-base'>{deed?.data?.assigneeAddress}</p>
              </div>
            </div>
          </div>

          {/* Assignment Details */}
          <div className='rounded-lg border p-6 space-y-4'>
            <h2 className='text-lg font-semibold'>Assignment Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Consideration Amount</p>
                <p className='text-base font-medium'>₦{deed?.data?.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Duration</p>
                <p className='text-base'>{deed?.data?.duration}</p>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className='rounded-lg border p-6 space-y-4'>
            <h2 className='text-lg font-semibold'>Property Details</h2>
            <div>
              <p className='text-sm text-muted-foreground'>Description</p>
              <p className='text-base whitespace-pre-wrap'>{deed?.data?.propertyDescription}</p>
            </div>
          </div>

          {/* Deed of Assignment User */}
          {deed?.data?.user && (
            <div className='rounded-lg border p-6 space-y-4'>
              <h2 className='text-lg font-semibold'>Posted By</h2>
              <p className='text-base'>
                <span className='font-medium'>Name:</span> {deed?.data?.user?.fullName}
              </p>
              <p className='text-sm text-muted-foreground'>
                <span className='font-medium'>Email:</span> {deed?.data?.user?.email}
              </p>
            </div>
          )}

          {/* Supporting Documents */}
          <SupportingDocuments files={deed?.data?.uploadedFiles || []} />
        </div>
      </div>
    </>
  )
}
