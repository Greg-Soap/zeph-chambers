import type { Column } from '@/components/customs/custom-table'
import CustomTooltip from '@/components/customs/custom-tooltip'
import type { SingleLoan } from '@/types/agreements'
import { Edit2, Eye, Trash } from 'lucide-react'
import getTableActions from './get-table-actions'
import { Badge } from '@/components/ui/badge'

interface LoanColumnsProps {
  onEdit: (loan: SingleLoan) => void
  onDelete: (loan: SingleLoan) => void
  onView: (loan: SingleLoan) => void
}

export function getLoanColumns({
  onEdit,
  onDelete,
  onView,
}: LoanColumnsProps): Column<SingleLoan>[] {
  return [
    {
      key: 'lenderName',
      title: 'Lender',
      sortable: true,
      width: 'w-[200px] min-w-[150px]',
      render: (value?: string) => <div className='line-clamp-2'>{value || 'Not specified'}</div>,
    },
    {
      key: 'borrowerName',
      title: 'Borrower',
      sortable: true,
      width: 'w-[200px]',
      hideOnMobile: true,
      render: (value?: string) => <div className='line-clamp-2'>{value || 'Not specified'}</div>,
    },
    {
      key: 'interestRate',
      title: 'Interest Rate',
      width: 'w-[120px]',
      hideOnMobile: true,
      render: (value?: number) => (value ? `${value}%` : 'Not specified'),
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
      actions: (loan: SingleLoan) => getTableActions({ onEdit, onView, onDelete }, loan),
    },
  ]
}
