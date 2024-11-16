import type { Column } from '@/components/customs/custom-table'
import type { SingleTenancy } from '@/types/agreements'
import { Edit2, Eye, Trash } from 'lucide-react'

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
      key: 'id',
      title: 'Actions',
      width: 'w-[100px]',
      actions: (tenancy: SingleTenancy) => [
        {
          label: 'Edit',
          icon: <Edit2 className='h-4 w-4 sm:mr-2' />,
          onClick: () => onEdit?.(tenancy),
          showLabelOnMobile: false,
        },
        {
          label: 'View',
          icon: <Eye className='h-4 w-4 sm:mr-2' />,
          onClick: () => onView?.(tenancy),
          showLabelOnMobile: false,
        },
        {
          label: 'Delete',
          icon: <Trash className='h-4 w-4 sm:mr-2 text-red-500' />,
          onClick: () => onDelete?.(tenancy),
          showLabelOnMobile: false,
        },
      ],
    },
  ]
}
