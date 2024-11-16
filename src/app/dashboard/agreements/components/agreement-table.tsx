'use client'

import CustomTable, { type Column } from '@/components/customs/custom-table'
import { AGREEMENT_TYPES } from '../client'
import { getTenancyColumns } from './tenancy-columns'
import { getSaleColumns } from './sale-columns'
import { getDeedColumns } from './deed-columns'
import { getPowerColumns } from './power-columns'
import { getLoanColumns } from './loan-columns'
import { getLeaseColumns } from './lease-columns'

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
} as const

interface AgreementTableProps {
  type: string
  data: any[]
  isLoading?: boolean
  onEdit: (agreement: any) => void
  onDelete: (agreement: any) => void
  onView: (agreement: any) => void
}

export function AgreementTable({
  type,
  data = [],
  isLoading = false,
  onEdit,
  onDelete,
  onView,
}: AgreementTableProps) {
  let columns: Column<any>[] = []

  switch (type) {
    case AGREEMENT_TYPES.TENANCY:
      columns = getTenancyColumns({ onEdit, onDelete, onView })
      break
    case AGREEMENT_TYPES.SALES:
      columns = getSaleColumns({ onEdit, onDelete, onView })
      break
    case AGREEMENT_TYPES.DEED:
      columns = getDeedColumns({ onEdit, onDelete, onView })
      break
    case AGREEMENT_TYPES.POWER:
      columns = getPowerColumns({ onEdit, onDelete, onView })
      break
    case AGREEMENT_TYPES.LOAN:
      columns = getLoanColumns({ onEdit, onDelete, onView })
      break
    case AGREEMENT_TYPES.LEASE:
      columns = getLeaseColumns({ onEdit, onDelete, onView })
      break
    default:
      console.warn(`Unknown agreement type: ${type}`)
      columns = []
  }

  return (
    <div className='w-full overflow-x-auto'>
      <CustomTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyMessage={`No ${type} agreements found`}
        className='min-w-full'
        containerClassName='rounded-lg border shadow-sm'
      />
    </div>
  )
}
