import { redirect } from 'next/navigation'
import { channelTypeIconMap, roleIconMap } from '@/constants/icon-map'
import { redirectToSignIn } from '@clerk/nextjs'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'
import { ScrollArea } from '@/components/ui/scroll-area'

import { ServerHeader } from './server-header'
import { ServerSearchbar } from './server-searchbar'

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

  const members = server.members.filter(
    (member) => member.profileId !== profile!.id
  )
  const textChannels = server.channels.filter(
    (channel) => channel.type === 'TEXT'
  )
  const voiceChannels = server.channels.filter(
    (channel) => channel.type === 'VOICE'
  )
  const videoChannels = server.channels.filter(
    (channel) => channel.type === 'VIDEO'
  )

  return (
    <div className="flex h-full w-full flex-col space-y-4 bg-gray-200 dark:bg-gray-800">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-2">
        <div className="mt-1">
          <ServerSearchbar
            searchData={[
              {
                label: 'Text',
                type: 'channel',
                data: textChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelTypeIconMap[channel.type],
                })),
              },
              {
                label: 'Voice',
                type: 'channel',
                data: voiceChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelTypeIconMap[channel.type],
                })),
              },
              {
                label: 'Video',
                type: 'channel',
                data: videoChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelTypeIconMap[channel.type],
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                  role: member.role,
                  avatarImage: member.profile.imageUrl,
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  )
}
