import { channelTypeIconMap, roleIconMap } from '@/constants/icon-map'
import { ChannelType, MemberRole } from '@prisma/client'
import { Menu } from 'lucide-react'

import { UserAvatar } from '@/components/user-avatar'

interface ChatHeaderProps {
  type: 'channel' | 'conversation'
  name: string
  channelType?: ChannelType
  memberRole?: MemberRole
  avatarImage?: string
}

export async function ChatHeader({
  type,
  name,
  channelType,
  memberRole,
  avatarImage,
}: ChatHeaderProps) {
  return (
    <div className="text-md flex h-12 items-center  px-3 font-semibold">
      <Menu className="mr-2 h-5 w-5" />
      {type === 'channel' && channelType && channelTypeIconMap[channelType]}

      {type === 'conversation' && memberRole && (
        <div className="flex items-center">
          <UserAvatar src={avatarImage} className="h-10 w-10" />
          <p>{roleIconMap[memberRole]}</p>
        </div>
      )}
      <p className="font-semibold">{name}</p>
    </div>
  )
}
