'use client'

import { ServerWithMembersWithProfile } from '@/type'
import { MemberRole } from '@prisma/client'
import {
  ChevronDown,
  Hash,
  LogOut,
  Settings,
  Trash2,
  UserPlus2,
  Users2,
} from 'lucide-react'

import { useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
          <ChevronDown className="ml-auto h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-1 font-medium text-black dark:text-zinc-300">
        {isModerator && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('invite', { server })}
              className="text-indigo-600 dark:text-indigo-400"
            >
              Invite Friends
              <UserPlus2 className="ml-auto h-5 w-5" />
            </DropdownMenuItem>
            <DropdownMenuItem className="">
              Create Channel
              <Hash className="ml-auto h-5 w-5" />
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
              <Users2 className="ml-auto h-5 w-5" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen('edit-server', { server })}
              className=""
            >
              Server Setttings
              <Settings className="ml-auto h-5 w-5" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-rose-600 dark:text-rose-400">
              Delete Server
              <Trash2 className="ml-auto h-5 w-5" />
            </DropdownMenuItem>
          </>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="text-rose-600 dark:text-rose-400">
            Leave Server
            <LogOut className="ml-auto h-5 w-5" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
