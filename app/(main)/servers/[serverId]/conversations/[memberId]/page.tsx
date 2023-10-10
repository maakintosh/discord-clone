import { redirectToSignIn } from '@clerk/nextjs'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
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

  const member = await db.member.findUnique({
    where: {
      id: params.memberId,
    },
    include: {
      profile: true,
    },
  })

  const currentUserMember = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.serverId,
    },
  })

  if (!member || !currentUserMember) return null

  return (
    <div className="flex h-full flex-col">
      <ChatHeader
        serverId={params.serverId}
        type="conversation"
        name={member.profile.name}
        memberRole={member.role}
        avatarImage={member.profile.imageUrl}
      />
    </div>
  )
}
