'use client'

import { ServerWithMembersWithProfile } from '@/type'
import { ChannelType, MemberRole } from '@prisma/client'
import { Plus, Settings } from 'lucide-react'

import { useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'
import { ActionTooltip } from '@/components/action-tooltip'

interface ServerSectionProps {
  label: string
  sectionType: 'members' | 'channels'
  channelType?: ChannelType
  role?: MemberRole
  server?: ServerWithMembersWithProfile
}

export function ServerSection({
  label,
  sectionType,
  role,
  channelType,
  server,
}: ServerSectionProps) {
  const { onOpen } = useModal()
  return (
    <div className="flex h-6 items-center justify-between">
      <p className="text-sm font-semibold uppercase text-gray-400 dark:text-gray-600">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActionTooltip label="create channel" side="top">
          <Button
            onClick={() => onOpen('create-channel', { channelType })}
            variant="ghost"
            size="icon"
            className="text-gray-400 dark:text-gray-600"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActionTooltip label="manege members" side="top">
          <Button
            onClick={() => onOpen('members', { server })}
            variant="ghost"
            size="icon"
            className="text-gray-400 dark:text-gray-600"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </ActionTooltip>
      )}
    </div>
  )
}
