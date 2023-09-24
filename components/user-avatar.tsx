import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserAvatarProps {
  src?: string
  className?: string
}

export function UserAvatar({ src, className }: UserAvatarProps) {
  return (
    <Avatar className={cn('md:h-13 md:w-13 h-10 w-10', className)}>
      <AvatarImage src={src} />
    </Avatar>
  )
}
