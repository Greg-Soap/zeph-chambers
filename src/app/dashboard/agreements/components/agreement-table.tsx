'use client'

import { formatDistanceToNow } from 'date-fns'
import { Edit2, Trash } from 'lucide-react'
import CustomTable, { type Column } from '@/components/customs/custom-table'
import { Badge } from '@/components/ui/badge'

interface Agreement {
  id: string
  title?: string
  description?: string
  parties?: string
  status?: 'draft' | 'pending' | 'active' | 'expired'
  createdAt?: string
  updatedAt?: string
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
} as const

interface AgreementTableProps {
  type: string
  data?: Agreement[]
  isLoading?: boolean
  onEdit?: (agreement: Agreement) => void
  onDelete?: (agreement: Agreement) => void
}

export function AgreementTable({
  type,
  data = [],
  isLoading = false,
  onEdit,
  onDelete,
}: AgreementTableProps) {
  const columns: Column<Agreement>[] = [
    {
      key: 'title',
      title: 'Title',
      sortable: true,
      width: 'w-[250px] min-w-[200px]',
      render: (value?: string) => <div className='line-clamp-2'>{value || 'Untitled'}</div>,
    },
    {
      key: 'parties',
      title: 'Parties',
      sortable: true,
      width: 'w-[200px]',
      hideOnMobile: true,
      render: (value?: string) => (
        <div className='line-clamp-2'>{value || 'No parties specified'}</div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      width: 'w-[120px]',
      align: 'center',
      render: (value?: Agreement['status']) => (
        <Badge
          variant='secondary'
          className={`${value ? statusColors[value] : 'bg-gray-100 text-gray-800'} whitespace-nowrap`}>
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Draft'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      title: 'Created',
      width: 'w-[150px]',
      hideOnMobile: true,
      render: (value?: string) =>
        value ? formatDistanceToNow(new Date(value), { addSuffix: true }) : 'Not available',
    },
    {
      key: 'updatedAt',
      title: 'Last Updated',
      width: 'w-[150px]',
      hideOnTablet: true,
      render: (value?: string) =>
        value ? formatDistanceToNow(new Date(value), { addSuffix: true }) : 'Not available',
    },
    {
      key: 'id',
      title: 'Actions',
      width: 'w-[100px]',
      actions: (agreement: Agreement) => [
        {
          label: 'Edit',
          icon: <Edit2 className='h-4 w-4 sm:mr-2' />,
          onClick: () => onEdit?.(agreement),
          showLabelOnMobile: false,
        },
        {
          label: 'Delete',
          icon: <Trash className='h-4 w-4 sm:mr-2' />,
          onClick: () => onDelete?.(agreement),
          showLabelOnMobile: false,
        },
      ],
    },
  ]

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
