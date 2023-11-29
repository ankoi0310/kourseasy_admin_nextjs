import { createProduct } from '@/actions/product'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { Product, productSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Minus, X } from 'lucide-react'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

type ProductDialogProps = {
  title: string
  children: React.ReactNode
  product?: Product
}

const ProductDialog = ({ title, children, product }: ProductDialogProps) => {
  const { toast } = useToast()
  const [open, setOpen] = React.useState(false)
  const [include, setInclude] = React.useState('')
  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  })
  
  let { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'includes',
  } as any)
  
  const onOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      form.reset()
      fields = []
    }
  }
  
  const onSubmit = async (values: Product) => {
    const response = await createProduct(values)
    
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
  
  const addInclude = () => {
    append(include)
    setInclude('')
  }
  
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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='VIP CODE 1'
                        {...field}
                        value={field.value ?? ''}
                        onChange={(event) => field.onChange(event.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder='Enter description here...'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Includes</FormLabel>
                <ul className={'pl-2 list-disc'}>
                  {
                    fields.map((field, index) => (
                      <li key={field.id} className={'flex flex-row items-center justify-between gap-4'}>
                        <Controller
                          control={form.control}
                          name={`includes.${index}`}
                          render={({ field }) => {
                            return (
                              <div className={'flex flex-row items-center gap-2'}>
                                <Minus size={16} />
                                <Typography variant={'smallText'} className={'text-ellipsis'}>
                                  {field.value}
                                </Typography>
                              </div>
                            )
                          }}
                        />
                        <Button variant={'ghost'} onClick={() => remove(index)}>
                          <X className={'text-destructive'} />
                        </Button>
                      </li>
                    ))
                  }
                </ul>
                <div className={'flex flex-row gap-4'}>
                  <Input value={include} onChange={(event) => setInclude(event.target.value)} />
                  <Button type={'button'} onClick={addInclude}>Add</Button>
                </div>
              </FormItem>
              <FormField
                control={form.control}
                name='price'
                defaultValue={1000}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...form.register('price', {
                          valueAsNumber: true,
                        })}
                        placeholder='50000'
                        type='number'
                        onChange={(event) => field.onChange(event.target.value.length > 0 ? parseInt(event.target.value) : 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='timeOfUse'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time of use (days)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                      />
                    </FormControl>
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
export default ProductDialog
