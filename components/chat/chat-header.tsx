import { channelTypeIconMap, roleIconMap } from '@/constants/icon-map'
import { ChannelType, MemberRole } from '@prisma/client'

import { MobileSidebar } from '@/components/mobile-sidebar'
import { UserAvatar } from '@/components/user-avatar'

interface ChatHeaderProps {
  serverId: string
  type: 'channel' | 'conversation'
  name: string
  channelType?: ChannelType
  memberRole?: MemberRole
  avatarImage?: string
}

export async function ChatHeader({
  serverId,
  type,
  name,
  channelType,
  memberRole,
  avatarImage,
}: ChatHeaderProps) {
  return (
    <div className="text-md flex h-12 items-center  px-3 font-semibold">
      <MobileSidebar serverId={serverId} />
      {type === 'channel' && channelType && channelTypeIconMap[channelType]}

      {type === 'conversation' && memberRole && (
        <div className="flex items-center">
          <UserAvatar src={avatarImage} />
          <p>{roleIconMap[memberRole]}</p>
        </div>
      )}
      <p className="font-semibold">{name}</p>
    </div>
  )
}
