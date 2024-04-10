import { redirect } from 'next/navigation'
import { redirectToSignIn } from '@clerk/nextjs'

import { findOrCreateNewConversation } from '@/lib/actions/conversation'
import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'
import { ChatHeader } from '@/components/chat/chat-header'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessages } from '@/components/chat/chat-messages'
import { MediaRoom } from '@/components/media-room'

interface MemberIdPageProps {
  params: {
    serverId: string
    memberId: string
  }
  searchParams: {
    video?: boolean
  }
}

export default async function MemberIdPage({
  params,
  searchParams
}: MemberIdPageProps) {
  const profile = await currentUserProfile()
  if (!profile) return redirectToSignIn()

  const currentUserMember = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.serverId
    },
    include: {
      profile: true
    }
  })

  if (!currentUserMember) return redirect('/servers')

  const conversation = await findOrCreateNewConversation(
    currentUserMember.id,
    params.memberId
  )

  if (!conversation) return redirect(`/servers/${params.serverId}`)

  const { member1, member2 } = conversation

  const opponentMember =
    member1.profileId === currentUserMember.profileId ? member2 : member1

  return (
    <div className="flex h-full flex-col">
      <ChatHeader
        serverId={params.serverId}
        type="conversation"
        name={opponentMember.profile.name}
        memberRole={opponentMember.role}
        avatarImage={opponentMember.profile.imageUrl}
      />
      {searchParams.video && (
        <MediaRoom chatId={conversation.id} isVideo={true} isAudio={true} />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages
            type="conversation"
            apiUrl="/api/direct-messages"
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id
            }}
            paramKey="conversationId"
            paramValue={conversation.id}
            chatId={conversation.id}
            currentUserMember={currentUserMember}
            name={opponentMember.profile.name}
          />
          <ChatInput
            type={'conversation'}
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id
            }}
            name={opponentMember.profile.name}
          />
        </>
      )}
    </div>
  )
}
