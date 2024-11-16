'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTabUrlSync } from '@/hooks/use-tab'
import CustomModal from '@/components/customs/custom-modal'
import { AgreementForm } from './components/agreement-form'
import { AgreementTable } from './components/agreement-table'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-breakpoints'

const AGREEMENT_TYPES = {
  TENANCY: 'tenancy',
  SALES: 'sales',
  DEED: 'deed',
  POWER: 'power',
  LOAN: 'loan',
  LEASE: 'lease',
} as const

type AgreementType = (typeof AGREEMENT_TYPES)[keyof typeof AGREEMENT_TYPES]

// Add this interface above mockAgreements
interface Agreement {
  id: string
  title?: string
  description?: string
  parties?: string
  status?: 'active' | 'draft' | 'pending' | 'expired'
  createdAt?: string
  updatedAt?: string
}

// Update the type annotation for mockAgreements
const mockAgreements: Agreement[] = [
  {
    id: '1',
    title: 'Sample Agreement',
    description: 'This is a sample agreement',
    parties: 'John Doe, Jane Smith',
    status: 'active',
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Draft Agreement',
    description: 'This is a draft agreement',
    parties: 'Alice Johnson, Bob Wilson',
    status: 'draft',
    createdAt: '2024-03-19T15:30:00Z',
    updatedAt: '2024-03-19T16:45:00Z',
  },
]

interface AgreementTableContainerProps {
  type: AgreementType
}

function AgreementTableContainer({ type }: AgreementTableContainerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isMobile = useIsMobile()

  const handleEdit = (agreement: Agreement) => {
    toast.info(`Editing agreement: ${agreement.title}`)
  }

  const handleDelete = (agreement: Agreement) => {
    toast.error(`Deleting agreement: ${agreement.title}`)
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-lg md:text-2xl font-bold capitalize'>{type} Agreements</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className='mr-0 md:mr-2 h-4 w-4' />
          {isMobile ? '' : `Add ${type}`}
        </Button>
      </div>

      <CustomModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={`Create ${type} Agreement`}
        size='lg'>
        <AgreementForm type={type} onSuccess={() => setIsModalOpen(false)} />
      </CustomModal>

      <AgreementTable
        type={type}
        data={mockAgreements}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default function AgreementsClient() {
  const { currentTab, setTab } = useTabUrlSync(AGREEMENT_TYPES.TENANCY)

  return (
    <div className='container space-y-6 p-4 md:p-6 lg:p-8'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold tracking-tight'>Agreements</h1>
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
