'use client'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { SIDE_NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type SideNavProps = React.HTMLAttributes<HTMLDivElement> & {}

const SideNav = ({ className }: SideNavProps) => {
  const pathname = usePathname()
  
  return (
    <div className={cn('h-full px-2 pb-12 border-r-2', className)}>
      <div className='space-y-4 py-4'>
        {
          SIDE_NAV_ITEMS.map((item, index) => (
            <div key={index} className='py-2'>
              <Typography variant={'h4'} className='mb-2 px-4 overflow-ellipsis'>
                {item.title}
              </Typography>
              <div className={'flex flex-col gap-1'}>
                {
                  item.items.map((subItem, subIndex) => (
                    <Link key={subIndex} href={subItem.path}>
                      <Button
                        key={subIndex}
                        variant={pathname === subItem.path ? 'secondary' : 'ghost'}
                        className='w-full flex justify-start items-center gap-2'
                      >
                        {
                          subItem.icon && <subItem.icon className={'col-span-1'} />
                        }
                        <Typography variant={'h6'} className={'text-start col-span-4 font-medium overflow-hidden text-ellipsis'}>
                          {subItem.title}
                        </Typography>
                      </Button>
                    </Link>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default SideNav
