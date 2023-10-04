import { redirect } from 'next/navigation'
import { channelTypeIconMap, roleIconMap } from '@/constants/icon-map'
import { ChannelType } from '@prisma/client'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { ServerChannel } from './server-channel'
import { ServerHeader } from './server-header'
import { ServerMember } from './server-member'
import { ServerSearchbar } from './server-searchbar'
import { ServerSection } from './server-section'

interface ServerSidebarProps {
  serverId: string
}

export async function ServerSidebar({ serverId }: ServerSidebarProps) {
  const profile = await currentUserProfile()
  if (!profile) redirect('/')

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

  const role = server.members.find((member) => member.profileId === profile.id)
    ?.role

  return (
    <div className="flex h-full w-full flex-col space-y-4 bg-gray-200 dark:bg-gray-800">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-2">
        <div className="">
          <ServerSearchbar
            searchData={[
              {
                label: 'Text Channels',
                searchType: 'channel',
                data: textChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelTypeIconMap[channel.type],
                })),
              },
              {
                label: 'Voice Channels',
                searchType: 'channel',
                data: voiceChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelTypeIconMap[channel.type],
                })),
              },
              {
                label: 'Video Channels',
                searchType: 'channel',
                data: videoChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: channelTypeIconMap[channel.type],
                })),
              },
              {
                label: 'Members',
                searchType: 'member',
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
        <Separator className="rounde-md my-2 bg-zinc-300 dark:bg-zinc-700" />
        {!!textChannels.length && (
          <div className="mb-3">
            <ServerSection
              label="Text Channels"
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
            />
            <div className="space-y-1">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!voiceChannels.length && (
          <div className="mb-3">
            <ServerSection
              label="Voice Channels"
              sectionType="channels"
              channelType={ChannelType.VOICE}
              role={role}
            />
            <div className="space-y-1">
              {voiceChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels.length && (
          <div className="mb-3">
            <ServerSection
              label="Video Channels"
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
            />
            <div className="space-y-1">
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}
        {!!members.length && (
          <div className="mb-3">
            <ServerSection
              label="Members"
              sectionType="members"
              role={role}
              server={server}
            />
            <div className="space-y-1">
              {members.map((member) => (
                <ServerMember member={member} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
