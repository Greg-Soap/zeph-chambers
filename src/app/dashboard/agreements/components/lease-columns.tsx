import type { Column } from '@/components/customs/custom-table'
import type { SingleLease } from '@/types/agreements'
import getTableActions from './get-table-actions'
import { Badge } from '@/components/ui/badge'

interface LeaseColumnsProps {
  onEdit: (lease: SingleLease) => void
  onDelete: (lease: SingleLease) => void
  onView: (lease: SingleLease) => void
}

export function getLeaseColumns({
  onEdit,
  onDelete,
  onView,
}: LeaseColumnsProps): Column<SingleLease>[] {
  return [
    {
      key: 'leaserName',
      title: 'Leaser',
      sortable: true,
      width: 'w-[200px] min-w-[150px]',
      render: (value?: string) => <div className='line-clamp-2'>{value || 'Not specified'}</div>,
    },
    {
      key: 'lesseeName',
      title: 'Lessee',
      sortable: true,
      width: 'w-[200px]',
      hideOnMobile: true,
      render: (value?: string) => <div className='line-clamp-2'>{value || 'Not specified'}</div>,
    },
    {
      key: 'propertyDescription',
      title: 'Property',
      width: 'w-[250px]',
      hideOnMobile: true,
      render: (value?: string) => <div className='line-clamp-2'>{value || 'Not specified'}</div>,
    },
    {
      key: 'amount',
      title: 'Amount',
      width: 'w-[120px]',
      render: (value?: number) => (value ? `$${value.toLocaleString()}` : 'Not specified'),
    },
    {
      key: 'duration',
      title: 'Duration',
      width: 'w-[120px]',
      hideOnTablet: true,
      render: (value?: string) => value || 'Not specified',
    },
    {
      key: 'metadata.status',
      title: 'Status',
      width: 'w-[120px] min-w-[100px]',
      render: (value?: string) => {
        const status = value || 'unpaid'
        return (
          <Badge variant={status.toLowerCase() === 'paid' ? 'default' : 'destructive'}>
            {status}
          </Badge>
        )
      },
    },
    {
      key: 'id',
      title: '',
      width: 'w-[30px]',
      actions: (lease: SingleLease) => getTableActions({ onEdit, onView, onDelete }, lease),
    },
  ]
}
