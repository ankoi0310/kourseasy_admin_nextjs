import { registerCourse } from '@/app/dkmh/action'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { CourseRegisterRequest, courseRegisterRequestSchema, CourseRegistrationResult } from '@/lib/types'
import { isLoggedIn, cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

type CourseRegistrationFormProps = React.HTMLAttributes<HTMLDivElement> & {
  setCourseRegistrationResult: Dispatch<SetStateAction<CourseRegistrationResult[]>>
}

const CourseRegistrationForm = ({ className, setCourseRegistrationResult }: CourseRegistrationFormProps) => {
  const { toast } = useToast()
  const form = useForm<CourseRegisterRequest>({
    resolver: zodResolver(courseRegisterRequestSchema),
  })
  
  const onSubmit = (values: CourseRegisterRequest) => {
    if (!isLoggedIn()) {
      toast({
        // @ts-ignore
        title: (
          <div className={'flex flex-row items-center gap-2'}>
            <X size={16} />
            <Typography variant={'h6'}>Error</Typography>
          </div>
        ),
        description: (
          <Typography variant={'p'}>
            Please login first
          </Typography>
        ),
      })
      return
    }
    
    const ids = values.courseIdStr.trim().split(',').map((id) => id.trim())
    
    for (const id of ids) {
      try {
        registerCourse(id).then((courseRegistrationResult) => {
          setCourseRegistrationResult((prev) => {
            return [
              ...prev,
              courseRegistrationResult
            ]
          })
        })
      } catch (error) {
        setCourseRegistrationResult((prev) => {
          return [...prev, {
            isThanhCong: false,
            thongBaoLoi: 'Lỗi không xác định'
          }]
        })
      }
    }
  }
  
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Course Registration</CardTitle>
        <CardDescription>
          Enter your course group id to register
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className={'flex flex-col gap-4'}>
            <FormField
              control={form.control}
              name='courseIdStr'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Ids</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={10} placeholder={'Ex: -1234567890,-9876543210,...'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className={'justify-end'}>
            <Button>Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
export default CourseRegistrationForm
