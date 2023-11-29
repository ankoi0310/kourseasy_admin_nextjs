import { type ClassValue, clsx } from 'clsx'
import { jwtDecode } from 'jwt-decode'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const nanoid = customAlphabet(chars, 20)
  return nanoid()
}

export function createCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const nanoid = customAlphabet(chars, 12)
  return nanoid()
}

export function isLoggedIn() {
  const token = localStorage.getItem('access_token')
  
  if (!token) {
    return false
  }
  
  try {
    const decoded = jwtDecode(token)
    
    return !!(decoded.exp && decoded.exp * 1000 > Date.now())
  } catch (e) {
    return false
  }
}
