'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'

export interface Column<T> {
  key: keyof T
  title: string
  width?: string
  sortable?: boolean
  align?: 'center'
  hideOnMobile?: boolean
  hideOnTablet?: boolean
  render?: (value: any) => React.ReactNode
  actions?: (item: T) => { menu: React.ReactNode }
}

interface CustomTableProps<T> {
  data: T[]
  columns: Column<T>[]
  isLoading?: boolean
  emptyMessage?: string
  className?: string
  containerClassName?: string
}

function CustomTable<T>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No data available',
  className = '',
  containerClassName = '',
}: CustomTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null
    direction: 'asc' | 'desc'
  }>({
    key: null,
    direction: 'asc',
  })

  function handleSort(key: keyof T) {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue === bValue) return 0
    if (sortConfig.direction === 'asc') {
      return aValue < bValue ? -1 : 1
    }
    return aValue < bValue ? 1 : -1
  })

  if (isLoading) {
    return (
      <div className={`w-full h-48 flex items-center justify-center ${containerClassName}`}>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary' />
      </div>
    )
  }

  return (
    <div className={`rounded-md border ${containerClassName}`}>
      <Table className={className}>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                className={`
                  ${column.width || ''} 
                  ${column.align ? `text-${column.align}` : ''}
                  ${column.hideOnMobile ? 'hidden sm:table-cell' : ''}
                  ${column.hideOnTablet ? 'hidden md:table-cell' : ''}
                `}>
                {column.sortable ? (
                  <Button
                    variant='ghost'
                    onClick={() => handleSort(column.key)}
                    className='h-8 p-0 font-medium'>
                    {column.title}
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                ) : (
                  column.title
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className='h-24 text-center text-muted-foreground'>
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    className={`
                      ${column.align ? `text-${column.align}` : ''}
                      ${column.hideOnMobile ? 'hidden sm:table-cell' : ''}
                      ${column.hideOnTablet ? 'hidden md:table-cell' : ''}
                    `}>
                    {column.actions ? (
                      <div className='flex justify-end'>{column.actions(item).menu}</div>
                    ) : column.render ? (
                      column.render(item[column.key])
                    ) : (
                      String(item[column.key])
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CustomTable
