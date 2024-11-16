import type { Column } from '@/components/customs/custom-table'
import type { SingleLoan } from '@/types/agreements'
import { Edit2, Eye, Trash } from 'lucide-react'

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
      key: 'id',
      title: 'Actions',
      width: 'w-[100px]',
      actions: (loan: SingleLoan) => [
        {
          label: 'Edit',
          icon: <Edit2 className='h-4 w-4 sm:mr-2' />,
          onClick: () => onEdit?.(loan),
          showLabelOnMobile: false,
        },
        {
          label: 'View',
          icon: <Eye className='h-4 w-4 sm:mr-2' />,
          onClick: () => onView?.(loan),
          showLabelOnMobile: false,
        },
        {
          label: 'Delete',
          icon: <Trash className='h-4 w-4 sm:mr-2 text-red-500' />,
          onClick: () => onDelete?.(loan),
          showLabelOnMobile: false,
        },
      ],
    },
  ]
}
