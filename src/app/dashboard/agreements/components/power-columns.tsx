import type { Column } from '@/components/customs/custom-table'
import type { SinglePower } from '@/types/agreements'
import getTableActions from './get-table-actions'

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
      title: '',
      width: 'w-[30px]',
      actions: (power: SinglePower) => getTableActions({ onEdit, onView, onDelete }, power),
    },
  ]
}
