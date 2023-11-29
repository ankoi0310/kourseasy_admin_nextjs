import { createOrder } from '@/actions/order'
import { getProducts } from '@/actions/product'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { Order, orderSchema, Product } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type OrderDialogProps = {
  title: string
  children: React.ReactNode
  order?: Order
}

const OrderDialog = ({ title, children, order }: OrderDialogProps) => {
  const { toast } = useToast()
  const [open, setOpen] = React.useState(false)
  const [products, setProducts] = React.useState<Product[]>([])
  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: order,
  })
  
  const onOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      form.reset()
    }
  }
  
  const onSubmit = async (values: Order) => {
    const response = await createOrder(values)
    
    if (response.success) {
      setOpen(false)
      toast({
        // @ts-ignore
        title: (
          <div className={'flex flex-row items-center gap-2'}>
            <CheckCircle size={16} />
            <Typography variant={'h6'}>Success</Typography>
          </div>
        ),
        description: (
          <Typography variant={'p'}>
            Product has been created
          </Typography>
        ),
      })
    } else {
      toast({
        variant: 'destructive',
        // @ts-ignore
        title: (
          <div className={'flex flex-row items-center gap-2'}>
            <X className={'text-destructive'} size={16} />
            <Typography variant={'h6'}>Error</Typography>
          </div>
        ),
        description: (
          <Typography variant={'p'}>
            {response.message}
          </Typography>
        ),
      })
    }
  }
  
  const handleProductChange = (value: string) => {
    const product = products.find((product) => product.id === value)
    if (product) {
      form.setValue('product', product)
      form.setValue('price', product.price)
    }
  }
  
  useEffect(() => {
    const unsubscribe = getProducts(setProducts)
    
    return () => {
      unsubscribe()
    }
  }, [])
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={'relative flex flex-col gap-4'}
          >
            <div className='flex flex-col gap-4'>
              <FormField
                control={form.control}
                name='product.id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleProductChange(value)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={'Choose product'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit' className={'w-full'}>Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default OrderDialog
