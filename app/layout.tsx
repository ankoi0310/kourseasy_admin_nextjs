import Header from '@/components/layout/header'
import SideNav from '@/components/layout/side-nav'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  title: 'Kourseasy Admin',
  description: 'Kourseasy Admin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={'dark'} suppressHydrationWarning>
      <body className={montserrat.className} suppressHydrationWarning>
        <div className={'h-[100dvh] flex flex-col'}>
          <Header />
          <div className={'grid xl:grid-cols-12'}>
            <div className={'hidden xl:block xl:col-span-2'}>
              <SideNav />
            </div>
            <div className={'col-span-12 xl:col-span-10'}>
              {children}
            </div>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
