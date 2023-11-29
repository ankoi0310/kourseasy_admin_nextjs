'use client'

import CourseRegistrationForm from '@/app/dkmh/course-registration-form'
import LoginForm from '@/app/dkmh/login-form'
import { Typography } from '@/components/ui/typography'
import { CourseRegistrationResult } from '@/lib/types'
import React from 'react'

const DKMH = () => {
  const [courseRegistrationResult, setCourseRegistrationResult] = React.useState<CourseRegistrationResult[]>([])
  
  return (
    <div className={'flex flex-col justify-start gap-8 p-6'}>
      <Typography variant={'h3'}>Course Registration</Typography>
      <div className={'flex flex-col gap-6'}>
        <div className={'grid grid-cols-1 md:grid-cols-2 items-stretch gap-4'}>
          <LoginForm className={'col-span-1'} />
          <CourseRegistrationForm className={'col-span-1'} setCourseRegistrationResult={setCourseRegistrationResult} />
        </div>
        <div className={'flex flex-col items-center justify-center gap-4'}>
          <div>Registration Result</div>
          <div>{courseRegistrationResult.length}</div>
        </div>
      </div>
    </div>
  )
}
export default DKMH
