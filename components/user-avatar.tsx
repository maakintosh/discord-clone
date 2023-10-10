import { cn } from '@/lib/utils'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface UserAvatarProps {
  src?: string
  className?: string
}

export function UserAvatar({ src, className }: UserAvatarProps) {
  return (
    <Avatar className={cn('mx-1 h-10 w-10', className)}>
      <AvatarImage src={src} />
    </Avatar>
  )
}
