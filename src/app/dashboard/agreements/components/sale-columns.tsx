import type { Column } from '@/components/customs/custom-table'
import type { SingleSale } from '@/types/agreements'
import { Edit2, Eye, Trash } from 'lucide-react'

interface SaleColumnsProps {
  onEdit: (sale: SingleSale) => void
  onDelete: (sale: SingleSale) => void
  onView: (sale: SingleSale) => void
}

export function getSaleColumns({
  onEdit,
  onDelete,
  onView,
}: SaleColumnsProps): Column<SingleSale>[] {
  return [
    {
      key: 'vendorName',
      title: 'Vendor',
      sortable: true,
      width: 'w-[200px] min-w-[150px]',
      render: (value?: string) => <div className='line-clamp-2'>{value || 'Not specified'}</div>,
    },
    {
      key: 'purchaserName',
      title: 'Purchaser',
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
      key: 'id',
      title: 'Actions',
      width: 'w-[100px]',
      actions: (sale: SingleSale) => [
        {
          label: 'Edit',
          icon: <Edit2 className='h-4 w-4 sm:mr-2' />,
          onClick: () => onEdit?.(sale),
          showLabelOnMobile: false,
        },
        {
          label: 'View',
          icon: <Eye className='h-4 w-4 sm:mr-2' />,
          onClick: () => onView?.(sale),
          showLabelOnMobile: false,
        },
        {
          label: 'Delete',
          icon: <Trash className='h-4 w-4 sm:mr-2 text-red-500' />,
          onClick: () => onDelete?.(sale),
          showLabelOnMobile: false,
        },
      ],
    },
  ]
}
