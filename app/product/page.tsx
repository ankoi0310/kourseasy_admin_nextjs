'use client'

import { getProducts } from '@/actions/product'
import { columns } from '@/app/product/columns'
import { DataTable } from '@/app/product/data-table'
import { Typography } from '@/components/ui/typography'
import { Product } from '@/lib/types'
import React, { useEffect } from 'react'

const ProductPage = () => {
  const [products, setProducts] = React.useState<Product[]>([])
  
  useEffect(() => {
    const unsubscribe = getProducts(setProducts)
    return () => {
      unsubscribe()
    }
  }, [])
  
  return (
    <div className={'flex flex-col justify-start gap-8 p-6'}>
      <Typography variant={'h3'}>Product</Typography>
      <div>
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  )
}
export default ProductPage
