import { channelTypeIconMap, roleIconMap } from '@/constants/icon-map'
import { ChannelType, MemberRole } from '@prisma/client'

import { ConversationVideoButton } from '@/components/chat/conversation-video-button'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { SocketIndicator } from '@/components/socket-indicator'
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
          <UserAvatar src={avatarImage} className="h-8 w-8" />
          <p>{roleIconMap[memberRole]}</p>
        </div>
      )}
      <p className="font-semibold">{name}</p>
      <div className="ml-auto flex items-center gap-x-1">
        {type === 'conversation' && <ConversationVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  )
}
