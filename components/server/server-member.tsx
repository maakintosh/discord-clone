'use client'

import { useParams, useRouter } from 'next/navigation'
import { roleIconMap } from '@/constants/icon-map'
import { Member, Profile } from '@prisma/client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'

interface ServerSidebarProps {
  member: Member & { profile: Profile }
}

export function ServerMember({ member }: ServerSidebarProps) {
  const router = useRouter()
  const params = useParams()

  function onClick() {
    router.push(`/servers/${params.serverId}/comversations/${member.id}`)
  }

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="group flex w-full items-center justify-start rounded-md px-2 hover:bg-gray-300 dark:hover:bg-gray-700"
    >
      <div className="flex items-center">
        <UserAvatar src={member.profile.imageUrl} className="mr-2 h-8 w-8" />
        <div className="flex items-center  text-sm font-semibold">
          <p>{roleIconMap[member.role]}</p>
          <p
            className={cn(
              'text-zinc-500',
              params.memberId === member.id &&
                'line-clamp-1 text-primary dark:text-white'
            )}
          >
            {member.profile.name}
          </p>
        </div>
      </div>
    </Button>
  )
}