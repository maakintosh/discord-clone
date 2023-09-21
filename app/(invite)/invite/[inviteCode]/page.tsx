import { redirect } from 'next/navigation'
import { redirectToSignIn } from '@clerk/nextjs'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'

interface InvitePageProps {
  params: {
    inviteCode: string
  }
}

export default async function InvitePage({ params }: InvitePageProps) {
  const profile = await currentUserProfile()
  if (!profile) {
    redirectToSignIn()
  }

  if (!params.inviteCode) {
    redirect('/')
  }

  // checks if the user is already a member of the server and redirects them to the server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  })

  if (existingServer) {
    redirect(`/servers/${existingServer.id}`)
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile!.id,
          },
        ],
      },
    },
  })

  if (server) {
    redirect(`/servers/${server.id}`)
  }

  return null
}
