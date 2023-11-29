import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import React from 'react'

const Logo = () => {
  return (
    <Typography variant={'h2'}>
      Kourseasy
    </Typography>
  )
}

const Header = () => {
  return (
    <div className={cn(
      'flex flex-row items-center justify-start gap-8 p-6 py-4',
      'border-b-2'
    )}>
      <Logo />
    </div>
  )
}
export default Header
