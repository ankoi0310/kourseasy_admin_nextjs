'use client'

import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header'
import { DataTableRowActions } from '@/app/product/data-table-row-actions'
import { statuses } from '@/lib/constants'
import { Product } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'


export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.original.name}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span>
            {row.getValue('price')}
          </span>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    id: 'Date Created',
    accessorKey: 'dateCreated',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date Created' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <span>{row.original.dateCreated}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'Date Updated',
    accessorKey: 'dateUpdated',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date Updated' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <span>{row.original.dateUpdated}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'Status',
    accessorKey: 'isAvailable',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.original.isAvailable,
      )
      
      if (status == null) {
        return null
      }
      
      return (
        <div className='flex items-center justify-start gap-2'>
          {status.icon && (
            <status.icon className='text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
