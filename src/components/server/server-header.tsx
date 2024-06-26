'use client'

import { ServerWithMembersWithProfile } from '@/type'
import { ChannelType, MemberRole } from '@prisma/client'
import {
  ChevronDown,
  Hash,
  LogOut,
  Settings,
  Trash2,
  UserPlus2,
  Users2
} from 'lucide-react'

import { useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface ServerHeaderProps {
  server: ServerWithMembersWithProfile
  role?: MemberRole
}

export function ServerHeader({ server, role }: ServerHeaderProps) {
  const { onOpen } = useModal()

  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="text-md flex h-12 w-full items-center overflow-hidden px-3 font-semibold"
        >
          {server.name}
          <ChevronDown className="ml-auto size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-1 font-medium">
        {isModerator && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('invite', { server })}
              className="text-indigo-600 dark:text-indigo-400"
            >
              Invite Friends
              <UserPlus2 className="ml-auto size-5" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                onOpen('create-channel', { channelType: ChannelType.TEXT })
              }
              className=""
            >
              Create Channel
              <Hash className="ml-auto size-5" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('members', { server })}
              className=""
            >
              Manage Members
              <Users2 className="ml-auto size-5" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen('edit-server', { server })}
              className=""
            >
              Server Setttings
              <Settings className="ml-auto size-5" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onOpen('delete-server', { server })}
              className="text-rose-500"
            >
              Delete Server
              <Trash2 className="ml-auto size-5" />
            </DropdownMenuItem>
          </>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('leave-server', { server })}
            className="text-rose-500"
          >
            Leave Server
            <LogOut className="ml-auto size-5" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
