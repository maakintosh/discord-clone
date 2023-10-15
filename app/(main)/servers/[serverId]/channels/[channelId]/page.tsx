import { redirect } from 'next/navigation'
import { redirectToSignIn } from '@clerk/nextjs'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'
import { ChatHeader } from '@/components/chat/chat-header'
import { ChatInput } from '@/components/chat/chat-input'

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
    <div className="flex min-h-screen flex-col">
      <ChatHeader
        serverId={params.serverId}
        type="channel"
        name={channel.name}
        channelType={channel.type}
      />
      <div className="flex-1">chat massages here</div>
      <ChatInput
        type={'channel'}
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        name={channel.name}
      />
    </div>
  )
}
