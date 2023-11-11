import { redirect } from 'next/navigation'
import { redirectToSignIn } from '@clerk/nextjs'
import { ChannelType } from '@prisma/client'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'
import { ChatHeader } from '@/components/chat/chat-header'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessages } from '@/components/chat/chat-messages'

interface ChannelIdPageProps {
  params: {
    serverId: string
    channelId: string
  }
}

export default async function ChannelIdPage({ params }: ChannelIdPageProps) {
  const profile = await currentUserProfile()
  if (!profile) return redirectToSignIn()

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  })

  const currentUserMember = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.serverId,
    },
  })

  if (!channel || !currentUserMember) return redirect('/')

  return (
    <div className=" flex h-full flex-col">
      <ChatHeader
        serverId={channel.serverId}
        type="channel"
        name={channel.name}
        channelType={channel.type}
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
            chatId={channel.id}
            currentUserMember={currentUserMember}
            name={channel.name}
          />
          <ChatInput
            type={'channel'}
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            name={channel.name}
          />
        </>
      )}
    </div>
  )
}
