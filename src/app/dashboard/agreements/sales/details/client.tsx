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
import { Badge } from '@/components/ui/badge'
import PaymentButton from '@/components/payment-button'

export default function Client() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const saleId = searchParams.get('id')
  const qc = useQueryClient()
  // Fetch sale data
  const { data: sale, isLoading } = useQuery({
    queryKey: ['sale', saleId],
    queryFn: () => {
      if (!saleId) throw new Error('No sale ID provided')
      return agreementsService.getSaleAgreement(saleId)
    },
    enabled: !!saleId,
    retry: false,
  })

  // Delete sale mutation
  const { mutate: deleteSale, isPending: isDeleting } = useMutation({
    mutationFn: agreementsService.deleteSaleAgreement,
    onSuccess: () => {
      toast.success('Sale agreement deleted successfully')
      qc.invalidateQueries({ queryKey: ['agreements'] })
      router.push('/dashboard/agreements?tab=sale')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete sale agreement')
    },
  })

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <MiniLoader />
      </div>
    )
  }

  if (!sale?.data) {
    return <div>Sale agreement not found</div>
  }

  const handleEdit = () => {
    router.push(`/dashboard/agreements/sales/edit?id=${saleId}`)
  }

  const handleDelete = () => {
    if (!saleId) return
    deleteSale(saleId)
  }

  return (
    <>
      <LoadingOverlay isLoading={isDeleting} />
      <div className='container max-w-3xl py-6'>
        <div className='flex items-center justify-between mb-6'>
          <PageHeader
            title='Sale Agreement Details'
            description='View and manage sale agreement information'
          />
          <div className='flex gap-3'>
            <Badge
              variant={
                sale?.data?.metadata?.status?.toLowerCase() === 'paid' ? 'default' : 'destructive'
              }>
              {sale?.data?.metadata?.status || 'unpaid'}
            </Badge>
            <Button variant='outline' size='icon' onClick={handleEdit} disabled={isDeleting}>
              <Pencil className='h-4 w-4' />
            </Button>
            <CustomDialog
              trigger={
                <Button variant='destructive' size='icon' disabled={isDeleting}>
                  <Trash2 className='h-4 w-4' />
                </Button>
              }
              title='Delete Sale Agreement'
              description='Are you sure you want to delete this sale agreement? This action cannot be undone.'
              confirmText='Delete'
              cancelText='Cancel'
              actionVariant='destructive'
              onConfirm={handleDelete}
            />
          </div>
        </div>
        {sale?.data?.metadata?.status !== 'paid' && (
          <PaymentButton agreementId={saleId} agreementType='sales' />
        )}
        <div className='space-y-6'>
          {/* Vendor Information */}
          <div className='rounded-lg border p-6 space-y-4'>
            <h2 className='text-lg font-semibold'>Vendor Information</h2>
            <div>
              <p className='text-sm text-muted-foreground'>Name</p>
              <p className='text-base'>{sale?.data?.vendorName}</p>
            </div>
          </div>

          {/* Purchaser Information */}
          <div className='rounded-lg border p-6 space-y-4'>
            <h2 className='text-lg font-semibold'>Purchaser Information</h2>
            <div>
              <p className='text-sm text-muted-foreground'>Name</p>
              <p className='text-base'>{sale?.data?.purchaserName}</p>
            </div>
          </div>

          {/* Sale Details */}
          <div className='rounded-lg border p-6 space-y-4'>
            <h2 className='text-lg font-semibold'>Sale Details</h2>
            <div className='grid grid-cols-1 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Sale Amount</p>
                <p className='text-base'>₦{sale?.data?.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Property Description</p>
                <p className='text-base whitespace-pre-wrap'>{sale?.data?.propertyDescription}</p>
              </div>
            </div>
          </div>

          {/* Sale User */}
          {sale?.data?.user && (
            <div className='rounded-lg border p-6 space-y-4'>
              <h2 className='text-lg font-semibold'>Posted By</h2>
              <p className='text-base'>
                <span className='font-medium'>Name:</span> {sale?.data?.user?.fullName}
              </p>
              <p className='text-sm text-muted-foreground'>
                <span className='font-medium'>Email:</span> {sale?.data?.user?.email}
              </p>
            </div>
          )}

          {/* Supporting Documents */}
          <SupportingDocuments files={sale?.data?.uploadedFiles || []} />
        </div>
      </div>
    </>
  )
}
