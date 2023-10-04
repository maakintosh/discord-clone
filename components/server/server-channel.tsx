'use client'

import { useParams, useRouter } from 'next/navigation'
import { channelTypeIconMap } from '@/constants/icon-map'
import { Channel, MemberRole, Server } from '@prisma/client'
import { Edit, Lock, Trash2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { ModalType, useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'
import { ActionTooltip } from '@/components/action-tooltip'

interface ServerChannelProps {
  channel: Channel
  role?: MemberRole
  server?: Server
}

export function ServerChannel({ channel, role, server }: ServerChannelProps) {
  const router = useRouter()
  const params = useParams()
  const { onOpen } = useModal()

  const ChannelIcon = channelTypeIconMap[channel.type]

  function onClick() {
    router.push(`/servers/${params.serverId}/channels/${channel.id}`)
  }

  function onAction(e: React.MouseEvent, action: ModalType) {
    e.stopPropagation()
    onOpen(action, { channel, server })
  }

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="group flex w-full items-center rounded-md px-2 hover:bg-gray-300 dark:hover:bg-gray-700"
    >
      <div
        className={cn(
          'text-zinc-500',
          params.channelId === channel.id && 'text-primary dark:text-white'
        )}
      >
        {ChannelIcon}
      </div>
      <p
        className={cn(
          'text-zinc-500',
          params.channelId === channel.id &&
            'line-clamp-1 text-primary dark:text-white'
        )}
      >
        {channel.name}
      </p>
      {channel.name !== 'general' && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2 text-zinc-500">
          <ActionTooltip label="edit">
            <Edit
              onClick={(e) => onAction(e, 'edit-channel')}
              className="hidden h-5 w-5 group-hover:block "
            />
          </ActionTooltip>
          <ActionTooltip label="delete">
            <Trash2
              onClick={(e) => onAction(e, 'delete-channel')}
              className="hidden h-5 w-5 group-hover:block"
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === 'general' && (
        <div className="ml-auto text-zinc-500">
          <Lock className="h-5 w-5" />
        </div>
      )}
    </Button>
  )
}
