'use client'

import { getOrders } from '@/actions/order'
import { columns } from '@/app/order/columns'
import { DataTable } from '@/app/order/data-table'
import { Typography } from '@/components/ui/typography'
import { Order } from '@/lib/types'
import React, { useEffect } from 'react'

const OrderPage = () => {
  const [orders, setOrders] = React.useState<Order[]>([])
  
  useEffect(() => {
    const unsubscribe = getOrders(setOrders)
    return () => {
      unsubscribe()
    }
  }, [])
  
  return (
    <div className={'flex flex-col justify-start gap-8 p-6'}>
      <Typography variant={'h3'}>Order</Typography>
      <div>
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  )
}
export default OrderPage
