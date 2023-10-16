import { redirect } from 'next/navigation'
import { redirectToSignIn } from '@clerk/nextjs'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'

interface ServerIdPageProps {
  params: { serverId: string }
}

export default async function ServerIdPage({ params }: ServerIdPageProps) {
  const profile = await currentUserProfile()
  if (!profile) redirectToSignIn()

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: 'general',
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  // Users always land on 'general' channel first.
  const landingChannel = server?.channels[0]
  if (!landingChannel) return null

  return redirect(`/servers/${params.serverId}/channels/${landingChannel?.id}`)
}
