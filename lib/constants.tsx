import { SidebarItem, Status } from '@/lib/types'
import { AtSign, CheckCircle2, Contact2, History, LayoutDashboard, Package, PenSquare, Receipt, Users, XCircle } from 'lucide-react'

export const API_URL = 'https://dkmh.hcmuaf.edu.vn/api'

export const SIDE_NAV_ITEMS: SidebarItem[] = [
  {
    title: 'Management',
    items: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'User',
        path: '/user',
        icon: Users,
      },
      {
        title: 'Product',
        path: '/product',
        icon: Package,
      },
      {
        title: 'Order',
        path: '/order',
        icon: Receipt,
      },
    ],
  },
  {
    title: 'Tools',
    items: [
      {
        title: 'Course Registration',
        path: '/dkmh',
        icon: PenSquare,
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        title: 'Account',
        path: '/account',
        icon: AtSign,
      },
      {
        title: 'Profile',
        path: '/profile',
        icon: Contact2,
      },
      {
        title: 'Purchase History',
        path: '/purchase-history',
        icon: History,
      },
    ],
  },
]

export const statuses: Status[] = [
  {
    value: true,
    label: 'Available',
    icon: CheckCircle2,
  },
  {
    value: false,
    label: 'Unavailable',
    icon: XCircle,
  },
]

export const activationStatuses = [
  {
    value: true,
    label: 'Activated',
    icon: CheckCircle2,
  },
  {
    value: false,
    label: 'Not Activated',
    icon: XCircle,
  },
]

export const expirationStatuses = [
  {
    value: true,
    label: 'Expired',
    icon: CheckCircle2,
  },
  {
    value: false,
    label: 'Not Expired',
    icon: XCircle,
  },
]

export const errorMessages: { [key: number]: string } = {
  400: 'Your request is invalid',
  401: 'You are not authenticated',
  403: 'You are not authorized to access this resource',
  404: 'The requested resource was not found',
  500: 'Internal server error',
  502: 'Bad gateway',
  503: 'Service unavailable',
  504: 'Gateway timeout',
}
