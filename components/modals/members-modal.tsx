'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { roleIconMap } from '@/constants/icon-map'
import { ServerWithMembersWithProfile } from '@/type'
import { MemberRole } from '@prisma/client'
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import axios from 'axios'
import { Loader2, MoreVertical, UserX2 } from 'lucide-react'
import qs from 'query-string'
import toast from 'react-hot-toast'

import { useModal } from '@/hooks/use-modal-store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserAvatar } from '@/components/user-avatar'

export function MembersModal() {
  const router = useRouter()
  const { isOpen, onClose, onOpen, type, data } = useModal()
  const { server } = data as {
    server: ServerWithMembersWithProfile
  }
  const isModalOpen = isOpen && type === 'members'

  const [loadingId, setLoadingId] = useState('')

  async function onRoleChange(memberId: string, role: MemberRole) {
    try {
      setLoadingId(memberId)

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      })

      const res = await axios.patch(url, { role })

      router.refresh()
      toast.success('Role changed! 👍')
      onOpen('members', { server: res.data })
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. 😢')
    } finally {
      setLoadingId('')
    }
  }

  async function onKickout(memberId: string) {
    try {
      setLoadingId(memberId)

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      })

      const res = await axios.delete(url)

      router.refresh()
      toast.success('Member deleted. 👋')
      onOpen('members', { server: res.data })
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. 😢')
    } finally {
      setLoadingId('')
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className=" rounded-md bg-slate-800">
        <DialogHeader className="pt-6">
          <DialogTitle className="text-center text-2xl text-white">
            Manage Members ({server?.members?.length})
          </DialogTitle>
          <DialogDescription className="text-center">
            Change their roles, or kick them out.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-100 w-full md:p-4">
          {server?.members?.map((member) => {
            return (
              <div
                key={member.id}
                className="my-2 flex w-full items-center justify-between gap-x-2 rounded-md border-2 border-slate-700 p-2"
              >
                <div className="flex items-center ">
                  <UserAvatar src={member.profile.imageUrl} />
                  <div className="ml-2 flex flex-col  gap-y-1">
                    <div className="flex items-center gap-x-1 text-sm font-semibold">
                      <p className="truncate text-white">
                        {member.profile.name}
                      </p>
                      <p>{roleIconMap[member.role]}</p>
                    </div>
                    <p className="text-ellipsis break-all text-xs text-muted-foreground">
                      {member.profile.email}
                    </p>
                  </div>
                </div>
                {server?.profileId !== member.profile.id &&
                  loadingId !== member.id && (
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-5 w-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left" align="center">
                          <DropdownMenuRadioGroup value={member.role}>
                            <DropdownMenuRadioItem
                              onClick={() =>
                                onRoleChange(member.id, MemberRole.MODERATOR)
                              }
                              disabled={member.role === MemberRole.MODERATOR}
                              value={MemberRole.MODERATOR}
                            >
                              {roleIconMap[MemberRole.MODERATOR]}
                              Moderator
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              onClick={() =>
                                onRoleChange(member.id, MemberRole.GUEST)
                              }
                              disabled={member.role === MemberRole.GUEST}
                              value={MemberRole.GUEST}
                            >
                              {roleIconMap[MemberRole.GUEST]}
                              Guest
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onKickout(member.id)}
                          >
                            <div className="flex cursor-pointer justify-center gap-x-2 bg-red-500 hover:bg-red-500/80 ">
                              <UserX2 className="h-5 w-5 text-white" />
                              <p className="text-white">Kickout</p>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                {loadingId === member.id && (
                  <Loader2 className="ml-auto h-5 w-5 animate-spin" />
                )}
              </div>
            )
          })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
