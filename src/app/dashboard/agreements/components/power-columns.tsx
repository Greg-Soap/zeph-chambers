import type { Column } from '@/components/customs/custom-table'
import type { SinglePower } from '@/types/agreements'
import { Edit2, Eye, Trash } from 'lucide-react'

interface PowerColumnsProps {
  onEdit: (power: SinglePower) => void
  onDelete: (power: SinglePower) => void
  onView: (power: SinglePower) => void
}

export function getPowerColumns({
  onEdit,
  onDelete,
  onView,
}: PowerColumnsProps): Column<SinglePower>[] {
  return [
    {
      key: 'donorName',
      title: 'Donor',
      sortable: true,
      width: 'w-[200px] min-w-[150px]',
      render: (value?: string) => <div className='line-clamp-2'>{value || 'Not specified'}</div>,
    },
    {
      key: 'doneeName',
      title: 'Donee',
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
      key: 'id',
      title: 'Actions',
      width: 'w-[100px]',
      actions: (power: SinglePower) => [
        {
          label: 'Edit',
          icon: <Edit2 className='h-4 w-4 sm:mr-2' />,
          onClick: () => onEdit?.(power),
          showLabelOnMobile: false,
        },
        {
          label: 'View',
          icon: <Eye className='h-4 w-4 sm:mr-2' />,
          onClick: () => onView?.(power),
          showLabelOnMobile: false,
        },
        {
          label: 'Delete',
          icon: <Trash className='h-4 w-4 sm:mr-2 text-red-500' />,
          onClick: () => onDelete?.(power),
          showLabelOnMobile: false,
        },
      ],
    },
  ]
}
