import type { Column } from '@/components/customs/custom-table'
import type { SingleDeed } from '@/types/agreements'
import { Edit2, Eye, Trash } from 'lucide-react'

interface DeedColumnsProps {
  onEdit: (deed: SingleDeed) => void
  onDelete: (deed: SingleDeed) => void
  onView: (deed: SingleDeed) => void
}

export function getDeedColumns({
  onEdit,
  onDelete,
  onView,
}: DeedColumnsProps): Column<SingleDeed>[] {
  return [
    {
      key: 'assignorName',
      title: 'Assignor',
      sortable: true,
      width: 'w-[200px] min-w-[150px]',
      render: (value?: string) => <div className='line-clamp-2'>{value || 'Not specified'}</div>,
    },
    {
      key: 'assigneeName',
      title: 'Assignee',
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
      actions: (deed: SingleDeed) => [
        {
          label: 'Edit',
          icon: <Edit2 className='h-4 w-4 sm:mr-2' />,
          onClick: () => onEdit?.(deed),
          showLabelOnMobile: false,
        },
        {
          label: 'View',
          icon: <Eye className='h-4 w-4 sm:mr-2' />,
          onClick: () => onView?.(deed),
          showLabelOnMobile: false,
        },
        {
          label: 'Delete',
          icon: <Trash className='h-4 w-4 sm:mr-2 text-red-500' />,
          onClick: () => onDelete?.(deed),
          showLabelOnMobile: false,
        },
      ],
    },
  ]
}
