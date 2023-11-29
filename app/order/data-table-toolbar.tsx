'use client'

import { DataTableFacetedFilter } from '@/app/order/data-table-faceted-filter'
import { DataTableViewOptions } from '@/components/datatable/data-table-view-options'
import OrderDialog from '@/components/dialog/order-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { activationStatuses, expirationStatuses } from '@/lib/constants'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Plus } from 'lucide-react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center gap-2'>
        <OrderDialog title={'Create new order'}>
          <Button className={'h-8'}>
            <Plus className={'h-4 w-4'} />
          </Button>
        </OrderDialog>
        <Input
          placeholder='Type something...'
          value={(table.getColumn('code')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('code')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('Activated') && (
          <DataTableFacetedFilter
            column={table.getColumn('Activated')}
            title='Activated'
            options={activationStatuses}
          />
        )}
        {table.getColumn('Expired') && (
          <DataTableFacetedFilter
            column={table.getColumn('Expired')}
            title='Expired'
            options={expirationStatuses}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
