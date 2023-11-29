'use client'

import { login } from '@/app/dkmh/action'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { UserLoginRequest, userLoginRequestSchema, UserLoginResponse } from '@/lib/types'
import { isLoggedIn, cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type LoginFormProps = React.HTMLAttributes<HTMLDivElement> & {}

const LoginForm = ({ className }: LoginFormProps) => {
  const { toast } = useToast()
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm<UserLoginRequest>({
    resolver: zodResolver(userLoginRequestSchema),
    defaultValues: {
      username: '',
      password: '',
      grant_type: 'password',
    },
  })
  
  const onSubmit = async (values: UserLoginRequest) => {
    setLoading(true)
    const userLoginResponse = await login(values) as UserLoginResponse | null
    setLoading(false)
    
    if (userLoginResponse) {
      localStorage.setItem('access_token', userLoginResponse.access_token)
      setLoggedIn(true)
      
      toast({
        // @ts-ignore
        title: (
          <div className={'flex flex-row items-center gap-2'}>
            <CheckCircle size={16} />
            <Typography variant={'h6'}>Success</Typography>
          </div>
        ),
        description: (
          <Typography variant={'p'}>
            Login success
          </Typography>
        ),
      })
    } else {
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
            Login failed, please try again
          </Typography>
        ),
      })
    }
  }
  
  useEffect(() => {
    setLoggedIn(isLoggedIn())
  }, [])
  
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please login to continue
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className={'flex flex-col gap-4'}>
            <FormField
              control={form.control}
              name='grant_type'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type={'hidden'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type={'password'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={'flex items-center'}>
              <Typography variant={'h5'}>Status:</Typography>
              {
                loggedIn ? (
                  <Badge className={'ml-2'}>
                    Logged in
                  </Badge>
                ) : (
                  <Badge variant={'secondary'} className={'ml-2'}>
                    Not logged in
                  </Badge>
                )
              }
            </div>
          </CardContent>
          <CardFooter className={'justify-end'}>
            <Button>
              {
                loading ? 'Loading...' : 'Submit'
              }
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
export default LoginForm
