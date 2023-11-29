'use server'

import { API_URL, errorMessages } from '@/lib/constants'
import { CourseRegistrationResult, HttpResponse, UserLoginRequest } from '@/lib/types'
import { revalidatePath } from 'next/cache'
import { stringify } from 'querystring'

export async function login(userLoginRequest: UserLoginRequest) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: stringify(userLoginRequest),
    }
    
    const response = await fetch(`${API_URL}/auth/login`, options)
    
    if (!response.ok) {
      revalidatePath('/dkmh')
      return null
    }
    
    revalidatePath('/dkmh')
    return await response.json()
  } catch (error) {
    revalidatePath('/dkmh')
    return null
  }
}

export async function registerCourse(id: string, accessToken: string): Promise<CourseRegistrationResult> {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        'filter': {
          'id_to_hoc': id,
          'is_checked': true,
        },
      }),
    }
    
    const response = await fetch(`${API_URL}/dkmh/w-xulydkmhsinhvien`, options)
    
    if (response.status === 200) {
      const httpResponse = await response.json() as HttpResponse<CourseRegistrationResult>
      
      return httpResponse.data
    } else {
      return {
        is_thanh_cong: false,
        thong_bao_loi: errorMessages[response.status],
      }
    }
  } catch (error) {
    return {
      is_thanh_cong: false,
      thong_bao_loi: 'Mất kết nối đến máy chủ hoặc máy chủ đang bảo trì',
    }
  }
}
