import { redirect } from 'next/navigation'
import { redirectToSignIn } from '@clerk/nextjs'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'

import { ServerHeader } from './server-header'

interface ServerSidebarProps {
  serverId: string
}

export async function ServerSidebar({ serverId }: ServerSidebarProps) {
  const profile = await currentUserProfile()
  if (!profile) redirectToSignIn()

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  if (!server) redirect('/')

  const role = server.members.find((member) => member.profileId === profile!.id)
    ?.role

  return (
    <div className="flex h-full w-full flex-col space-y-4 bg-gray-300 dark:bg-gray-700">
      <ServerHeader server={server} role={role} />
    </div>
  )
}
