import { registerCourse } from '@/app/dkmh/action'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { CourseRegistrationMapping } from '@/lib/types'
import { isLoggedIn } from '@/lib/utils'
import { Loader2, RotateCw, X } from 'lucide-react'
import React from 'react'

type TryAgainButtonProps = {
  id: string
  setCourseRegistrationMapping: React.Dispatch<React.SetStateAction<CourseRegistrationMapping>>
}

const TryAgainButton = ({ id, setCourseRegistrationMapping }: TryAgainButtonProps) => {
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(false)
  
  const handleTryAgain = () => {
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
    
    setLoading(true)
    
    const accessToken = localStorage.getItem('access_token')
    registerCourse(id, accessToken!).then((courseRegistrationResult) => {
      setCourseRegistrationMapping((prev) => ({
        ...prev,
        [id]: courseRegistrationResult,
      }))
      setLoading(false)
    })
  }
  
  return (
    <Button
      className={'flex items-center justify-center gap-2'}
      onClick={handleTryAgain}
      disabled={loading}
    >
      {
        loading ? (
          <Loader2
            size={16}
            strokeWidth={2}
            className={'animate-spin'}
          />
        ) : (
          <>
            <span>Try again</span>
            <RotateCw size={16} />
          </>
        )
      }
    </Button>
  )
}
export default TryAgainButton
