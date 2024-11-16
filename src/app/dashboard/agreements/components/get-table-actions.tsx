import { Eye, Edit2, Trash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import CustomDialog from '@/components/customs/custom-dialog'

interface TableActionsProps<T> {
  onEdit: (item: T) => void
  onView: (item: T) => void
  onDelete: (item: T) => void
}

export default function getTableActions<T>(
  { onEdit, onView, onDelete }: TableActionsProps<T>,
  item: T,
) {
  return {
    menu: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => onView(item)}>
            <Eye className='mr-2 h-4 w-4' />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(item)}>
            <Edit2 className='mr-2 h-4 w-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CustomDialog
              trigger={
                <div className='flex items-center text-red-600 focus:text-red-600'>
                  <Trash className='mr-2 h-4 w-4' />
                  Delete
                </div>
              }
              title='Delete Agreement'
              description='Are you sure you want to delete this agreement? This action cannot be undone.'
              confirmText='Delete'
              cancelText='Cancel'
              actionVariant='destructive'
              onConfirm={() => onDelete(item)}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }
}
