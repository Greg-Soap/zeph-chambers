'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTabUrlSync } from '@/hooks/use-tab'
import { AgreementTable } from './components/agreement-table'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-breakpoints'
import { useRouter } from 'next/navigation'
import { startCase, toDashCase } from '@/lib/helper-func'
import type { ModelObject } from '@/lib/cookies'
import agreementsService from '@/services/agreements.service'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import LoadingOverlay from '@/components/loading-overlay'

export const AGREEMENT_TYPES = {
  TENANCY: 'tenancy',
  SALES: 'sales',
  DEED: 'deed of assignment',
  POWER: 'power of attorney',
  LOAN: 'loan',
  LEASE: 'lease',
} as const

type AgreementType = (typeof AGREEMENT_TYPES)[keyof typeof AGREEMENT_TYPES]

interface AgreementTableContainerProps {
  type: AgreementType
}

function AgreementTableContainer({ type }: AgreementTableContainerProps) {
  const router = useRouter()
  const isMobile = useIsMobile()
  const qc = useQueryClient()

  const { data: agreements, isLoading: isFetching } = useQuery({
    queryKey: ['agreements', type],
    queryFn: async () => {
      switch (type) {
        case AGREEMENT_TYPES.TENANCY:
          return agreementsService.getAllTenancyAgreements()
        case AGREEMENT_TYPES.SALES:
          return agreementsService.getAllSaleAgreements()
        case AGREEMENT_TYPES.DEED:
          return agreementsService.getAllDeedOfAssignments()
        case AGREEMENT_TYPES.POWER:
          return agreementsService.getAllPowerOfAttorneys()
        case AGREEMENT_TYPES.LOAN:
          return agreementsService.getAllLoanAgreements()
        case AGREEMENT_TYPES.LEASE:
          return agreementsService.getAllLeaseAgreements()
        default:
          throw new Error(`Unknown agreement type: ${type}`)
      }
    },
  })

  const { mutate: deleteAgreement, isPending: isDeleting } = useMutation({
    mutationFn: async (agreement: ModelObject) => {
      switch (type) {
        case AGREEMENT_TYPES.TENANCY:
          return agreementsService.deleteTenancyAgreement(agreement.id)
        case AGREEMENT_TYPES.SALES:
          return agreementsService.deleteSaleAgreement(agreement.id)
        case AGREEMENT_TYPES.DEED:
          return agreementsService.deleteDeedOfAssignment(agreement.id)
        case AGREEMENT_TYPES.POWER:
          return agreementsService.deletePowerOfAttorney(agreement.id)
        case AGREEMENT_TYPES.LOAN:
          return agreementsService.deleteLoanAgreement(agreement.id)
        case AGREEMENT_TYPES.LEASE:
          return agreementsService.deleteLeaseAgreement(agreement.id)
        default:
          throw new Error(`Unknown agreement type: ${type}`)
      }
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message || `${startCase(type)} agreement deleted successfully`)
      qc.invalidateQueries({ queryKey: ['agreements', type] })
    },
    onError: (error: Error) => {
      toast.error(error?.message || `Failed to delete ${type} agreement`)
    },
  })

  const handleEdit = (agreement: ModelObject) => {
    router.push(`/dashboard/agreements/${toDashCase(type)}/edit?id=${agreement.id}`)
  }

  const handleDelete = (agreement: ModelObject) => {
    deleteAgreement(agreement)
  }

  const handleView = (agreement: ModelObject) => {
    router.push(`/dashboard/agreements/${toDashCase(type)}/details?id=${agreement.id}`)
  }

  return (
    <>
      <LoadingOverlay isLoading={isDeleting} />
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg md:text-2xl font-bold capitalize'>{startCase(type)} Agreements</h2>
          <Button onClick={() => router.push(`/dashboard/agreements/${toDashCase(type)}/create`)}>
            <Plus className='mr-0 md:mr-2 h-4 w-4' />
            {isMobile ? '' : `Add ${type}`}
          </Button>
        </div>

        <AgreementTable
          type={type}
          data={agreements?.data ?? []}
          isLoading={isFetching}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>
    </>
  )
}

export default function AgreementsClient() {
  const { currentTab, setTab } = useTabUrlSync(AGREEMENT_TYPES.TENANCY)

  return (
    <div className='container space-y-6 p-4 md:p-6 lg:p-8'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-xl md:text-3xl font-bold tracking-tight'>Agreements</h1>
        <p className='text-muted-foreground'>
          Manage and track all your legal agreements in one place.
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setTab} className='space-y-4'>
        <div className='w-full '>
          <TabsList className='overflow-x-auto w-full sm:w-auto inline-flex h-auto p-1 flex-nowrap tabs-scrollbar'>
            <TabsTrigger
              value={AGREEMENT_TYPES.TENANCY}
              className='whitespace-nowrap px-3 py-1.5 text-sm'>
              Tenancy
            </TabsTrigger>
            <TabsTrigger
              value={AGREEMENT_TYPES.SALES}
              className='whitespace-nowrap px-3 py-1.5 text-sm'>
              Sales
            </TabsTrigger>
            <TabsTrigger
              value={AGREEMENT_TYPES.DEED}
              className='whitespace-nowrap px-3 py-1.5 text-sm'>
              Deed of Assignment
            </TabsTrigger>
            <TabsTrigger
              value={AGREEMENT_TYPES.POWER}
              className='whitespace-nowrap px-3 py-1.5 text-sm'>
              Power of Attorney
            </TabsTrigger>
            <TabsTrigger
              value={AGREEMENT_TYPES.LOAN}
              className='whitespace-nowrap px-3 py-1.5 text-sm'>
              Loan
            </TabsTrigger>
            <TabsTrigger
              value={AGREEMENT_TYPES.LEASE}
              className='whitespace-nowrap px-3 py-1.5 text-sm'>
              Lease
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={AGREEMENT_TYPES.TENANCY}>
          <AgreementTableContainer type={AGREEMENT_TYPES.TENANCY} />
        </TabsContent>
        <TabsContent value={AGREEMENT_TYPES.SALES}>
          <AgreementTableContainer type={AGREEMENT_TYPES.SALES} />
        </TabsContent>
        <TabsContent value={AGREEMENT_TYPES.DEED}>
          <AgreementTableContainer type={AGREEMENT_TYPES.DEED} />
        </TabsContent>
        <TabsContent value={AGREEMENT_TYPES.POWER}>
          <AgreementTableContainer type={AGREEMENT_TYPES.POWER} />
        </TabsContent>
        <TabsContent value={AGREEMENT_TYPES.LOAN}>
          <AgreementTableContainer type={AGREEMENT_TYPES.LOAN} />
        </TabsContent>
        <TabsContent value={AGREEMENT_TYPES.LEASE}>
          <AgreementTableContainer type={AGREEMENT_TYPES.LEASE} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
