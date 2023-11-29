'use client'

import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header'
import { DataTableRowActions } from '@/app/order/data-table-row-actions'
import { activationStatuses, expirationStatuses } from '@/lib/constants'
import { Order } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import dynamic from 'next/dynamic'

// dynamic import copy-to-clipboard
const CopyToClipboard = dynamic(() => import('@/components/share/copy-to-clipboard'), { ssr: false })

export const columns: ColumnDef<Order>[] = [
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
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Code' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.original.code}
          </span>
          <CopyToClipboard text={row.original.code} />
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
    id: 'Activated',
    accessorKey: 'isActivated',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Activated' />
    ),
    cell: ({ row }) => {
      const activated = activationStatuses.find(
        (activated) => activated.value === row.original.isActivated,
      )
      
      if (activated == null) {
        return null
      }
      
      return (
        <div className='flex items-center justify-start gap-2'>
          {activated.icon && (
            <activated.icon className='text-muted-foreground' />
          )}
          <span>{activated.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
  },
  {
    id: 'Expired',
    accessorKey: 'isExpired',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Expired' />
    ),
    cell: ({ row }) => {
      const expired = expirationStatuses.find(
        (expired) => expired.value === row.original.isExpired,
      )
      
      if (expired == null) {
        return null
      }
      
      return (
        <div className='flex items-center justify-start gap-2'>
          {expired.icon && (
            <expired.icon className='text-muted-foreground' />
          )}
          <span>{expired.label}</span>
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
