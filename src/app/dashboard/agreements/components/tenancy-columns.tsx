import type { Column } from '@/components/customs/custom-table'
import type { SingleTenancy } from '@/types/agreements'
import getTableActions from './get-table-actions'
import { Badge } from '@/components/ui/badge'

interface TenancyColumnsProps {
  onEdit: (tenancy: SingleTenancy) => void
  onDelete: (tenancy: SingleTenancy) => void
  onView: (tenancy: SingleTenancy) => void
}

export function getTenancyColumns({
  onEdit,
  onDelete,
  onView,
}: TenancyColumnsProps): Column<SingleTenancy>[] {
  return [
    {
      key: 'landlordName',
      title: 'Landlord',
      sortable: true,
      width: 'w-[200px] min-w-[150px]',
      render: (value?: string) => <div className='line-clamp-2'>{value || 'Not specified'}</div>,
    },
    {
      key: 'tenantName',
      title: 'Tenant',
      sortable: true,
      width: 'w-[200px] min-w-[150px]',
      // hideOnMobile: true,
      render: (value?: string) => <div className='line-clamp-2'>{value || 'Not specified'}</div>,
    },
    {
      key: 'propertyDescription',
      title: 'Property',
      width: 'w-[250px] min-w-[150px]',
      // hideOnMobile: true,
      render: (value?: string) => <div className='line-clamp-2'>{value || 'Not specified'}</div>,
    },
    {
      key: 'amount',
      title: 'Amount',
      width: 'w-[120px] min-w-[100px]',
      render: (value?: number) => (value ? `₦${value.toLocaleString()}` : 'Not specified'),
    },
    {
      key: 'duration',
      title: 'Duration',
      width: 'w-[120px] min-w-[100px]',
      // hideOnTablet: true,
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
      actions: (tenancy: SingleTenancy) => getTableActions({ onEdit, onView, onDelete }, tenancy),
    },
  ]
}
