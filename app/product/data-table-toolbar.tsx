'use client'

import { DataTableFacetedFilter } from '@/app/product/data-table-faceted-filter'
import { DataTableViewOptions } from '@/components/datatable/data-table-view-options'
import ProductDialog from '@/components/dialog/product-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { statuses } from '@/lib/constants'
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
        <ProductDialog title={'Create new product'}>
          <Button className={'h-8'}>
            <Plus className={'h-4 w-4'} />
          </Button>
        </ProductDialog>
        <Input
          placeholder='Type something...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn('Status') && (
          <DataTableFacetedFilter
            column={table.getColumn('Status')}
            title='Status'
            options={statuses}
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
