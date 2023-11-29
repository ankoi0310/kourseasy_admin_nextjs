'use server'

import { API_URL } from '@/lib/constants'
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

export async function registerCourse(id: string): Promise<CourseRegistrationResult> {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
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
      
      revalidatePath('/dkmh')
      return httpResponse.data
    } else {
      revalidatePath('/dkmh')
      return {
        isThanhCong: false,
        thongBaoLoi: 'Đăng ký thất bại',
      }
    }
  } catch (error) {
    revalidatePath('/dkmh')
    return {
      isThanhCong: false,
      thongBaoLoi: 'Đăng ký thất bại',
    }
  }
}
