import { redirect } from 'next/navigation'
import { redirectToSignIn } from '@clerk/nextjs'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { findOrCreateNewConversation } from '@/lib/conversation'
import { db } from '@/lib/db'
import { ChatHeader } from '@/components/chat/chat-header'

interface MemberIdPageProps {
  params: {
    serverId: string
    memberId: string
  }
}

export default async function MemberIdPage({ params }: MemberIdPageProps) {
  const profile = await currentUserProfile()
  if (!profile) return redirectToSignIn()

  const currentUserMember = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.serverId,
    },
    include: {
      profile: true,
    },
  })

  if (!currentUserMember) return redirect('/')

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
    </div>
  )
}
