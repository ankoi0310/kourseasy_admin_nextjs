import { createCode, createId } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { z } from 'zod'

export type SidebarItem = {
  title: string
  items: NavItem[]
}

export type NavItem = {
  title: string
  path: string
  icon?: LucideIcon
}

export type AppResponse = {
  success: boolean
  code: number
  message: string
  data?: any
}

export type HttpResponse<T> = {
  result: boolean,
  code: number,
  data: T,
}

export type Status = {
  value: boolean
  label: string
  icon?: LucideIcon
}

export const userSchema = z.object({
  id: z.coerce.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  dateCreated: z.string(),
  dateUpdated: z.string(),
  isAdmin: z.boolean(),
  isActivated: z.boolean(),
  isBlocked: z.boolean(),
})

export type User = z.infer<typeof userSchema>

export const productSchema = z.object({
  id: z.coerce.string().default(createId),
  name: z.string({
    required_error: 'Name is required',
  }).min(1, 'Name must be at least 1 character'),
  description: z.string().default(''),
  includes: z.array(z.string()).default([]),
  price: z.number().min(
    1000,
    'Price must be greater than 1000',
  ).step(
    1000,
    'Price must be a multiple of 1000',
  ),
  timeOfUse: z.number().int('Time of use must be an integer').positive('Time of use must be positive').default(1),
  isAvailable: z.coerce.boolean().default(true),
  dateCreated: z.coerce.string().default(new Date().toLocaleString('vi-VN')),
  dateUpdated: z.coerce.string().default(new Date().toLocaleString('vi-VN')),
})

export type Product = z.infer<typeof productSchema>

export const orderSchema = z.object({
  id: z.coerce.string().default(createId),
  code: z.coerce.string().default(createCode),
  userId: z.coerce.string().nullable(),
  product: productSchema,
  price: z.coerce.number(),
  dateCreated: z.coerce.string().default(new Date().toLocaleString('vi-VN')),
  dateActivated: z.coerce.string().nullable(),
  dateExpired: z.coerce.string().nullable(),
  isActivated: z.coerce.boolean().default(false),
  isExpired: z.coerce.boolean().default(false),
})

export type Order = z.infer<typeof orderSchema>

export const userLoginRequestSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
  }).min(1, 'Username cannot be empty'),
  password: z.string({
    required_error: 'Password is required',
  }).min(1, 'Password cannot be empty'),
  grant_type: z.literal('password'),
})

export type UserLoginRequest = z.infer<typeof userLoginRequestSchema>

export type UserLoginResponse = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  userName: string
  id: string
  logtime: string
  code: string
  result: string
  passtype: string
  name: string
  principal: string
  wcf: string
  '.expires': string
  '.issued': string
}

export const courseRegisterRequestSchema = z.object({
  courseIdStr: z.string({
    required_error: 'Course IDs are required',
  }).min(1, 'Course IDs cannot be empty'),
})

export type CourseRegisterRequest = z.infer<typeof courseRegisterRequestSchema>

export type CourseRegistrationResult = {
  is_thanh_cong: boolean
  thong_bao_loi: string
}

export type CourseRegistrationMapping = {
  [id: string]: CourseRegistrationResult
}
