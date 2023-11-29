import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'
import { useToast } from '@/components/ui/use-toast'
import { CheckCircle, Copy } from 'lucide-react'
import React from 'react'

type CopyToClipboardProps = {
  text: string
}

const CopyToClipboard = ({ text }: CopyToClipboardProps) => {
  const { toast } = useToast()
  
  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(text)
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
          {text} has been copied to clipboard
        </Typography>
      ),
    })
  }
  
  return (
    <Badge className='cursor-pointer' onClick={handleCopyToClipboard}>
      <Copy className={'w-4 h-4'} />
    </Badge>
  )
}
export default CopyToClipboard
