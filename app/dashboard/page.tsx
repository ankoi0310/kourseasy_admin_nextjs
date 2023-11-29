import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { DollarSign } from 'lucide-react'

export default function Home() {
  return (
    <div className={'p-6'}>
      <Typography variant={'h3'} className={'mb-8'}>Dashboard</Typography>
      
      <div className={'grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'}>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle>
              <Typography variant={'smallText'}>Total Revenue</Typography>
            </CardTitle>
            <DollarSign size={20} />
          </CardHeader>
          <CardContent>
            <Typography
              variant={'h3'}
              as={'div'}
              className={'font-bold'}
            >
              $45,231.89
            </Typography>
            <Typography variant={'mutedText'} className='text-xs'>
              +20.1% from last month
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Sales</CardHeader>
          <CardContent>1</CardContent>
        </Card>
        <Card>
          <CardHeader>Users</CardHeader>
          <CardContent>1</CardContent>
        </Card>
        <Card>
          <CardHeader>Products</CardHeader>
          <CardContent>1</CardContent>
        </Card>
      </div>
      
      {/* Chart */}
    </div>
  )
}
