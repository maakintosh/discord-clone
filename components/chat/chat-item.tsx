import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { roleIconMap } from '@/constants/icon-map'
import { Member, MemberRole, Profile } from '@prisma/client'
import { Edit, FileIcon, Trash, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { ActionTooltip } from '@/components/action-tooltip'
import { UserAvatar } from '@/components/user-avatar'

interface ChatItemProps {
  id: string
  content: string
  isDeleted: boolean
  fileUrl: string | null
  timestamp: string
  isUpdated: boolean
  messageOwnerMember: Member & {
    profile: Profile
  }
  currentUserMember: Member
  socketUrl: string
  socketQuery: Record<string, string>
}

export function ChatItem({
  id,
  content,
  isDeleted,
  fileUrl,
  timestamp,
  isUpdated,
  messageOwnerMember,
  currentUserMember,
  socketUrl,
  socketQuery,
}: ChatItemProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const isAdmin = currentUserMember.role === MemberRole.ADMIN
  const isModerator = currentUserMember.role === MemberRole.MODERATOR
  const isOwner = currentUserMember.id === messageOwnerMember.id
  const canEditMessage = !isDeleted && isOwner
  const canDeleteMessage = !isDeleted && (isOwner || isAdmin || isModerator)

  const fileType = fileUrl?.split('.').pop()
  const isPDF = fileUrl && fileType === 'pdf'
  const isImage = fileUrl && fileType !== 'pdf'

  async function onMemberClick() {
    if (messageOwnerMember.id === currentUserMember.id) return
    router.push(
      `/servers/${messageOwnerMember.serverId}/members/${messageOwnerMember.id}`
    )
  }

  return (
    <div className="group m-1 flex gap-x-1 rounded-md  p-2 hover:bg-gray-300/80 dark:hover:bg-gray-700/80">
      <div onClick={onMemberClick} className="cursor-pointer">
        <UserAvatar src={messageOwnerMember.profile.imageUrl} />
      </div>
      <div className=" flex flex-col gap-y-1">
        <div className="flex items-center justify-start gap-x-1 text-sm font-semibold">
          <p>{roleIconMap[messageOwnerMember.role]}</p>
          <p
            onClick={onMemberClick}
            className="cursor-pointer truncate font-semibold"
          >
            {messageOwnerMember.profile.name}
          </p>
          <p className="ml-1 text-ellipsis break-all text-xs text-muted-foreground">
            {timestamp}
          </p>
          {canDeleteMessage && (
            <div className="ml-auto hidden items-center gap-x-2 group-hover:flex">
              {canEditMessage && (
                <ActionTooltip label="edit">
                  <Edit
                    onClick={() => setIsEditing(true)}
                    className="h-6 w-6 text-zinc-400 dark:text-zinc-500"
                  />
                </ActionTooltip>
              )}
              <ActionTooltip label="delete">
                <Trash
                  // onClick={(e) => onAction(e, 'edit-channel')}
                  className="h-6 w-6 text-zinc-400 dark:text-zinc-500"
                />
              </ActionTooltip>
            </div>
          )}
        </div>
        {isImage && (
          <Link
            href={fileUrl}
            className=" relative mx-2 flex aspect-square h-64 w-64 items-center overflow-hidden rounded-md"
          >
            {/* TODO: Image size optimization */}
            <Image
              src={fileUrl}
              alt={content}
              fill
              className=" object-cover "
            />
          </Link>
        )}
        {isPDF && (
          <div className="relative mx-2 w-32 rounded-md bg-background/30 p-2">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className=" flex items-center justify-center gap-x-3 text-sm text-indigo-500 hover:underline dark:text-indigo-400"
            >
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <p>.pdf</p>
            </a>
          </div>
        )}
        {!fileUrl && !isEditing && (
          <p
            className={cn(
              'mx-2 text-sm text-zinc-600 dark:text-zinc-300',
              isDeleted && 'text-xs italic text-zinc-500 dark:text-zinc-400'
            )}
          >
            {content}
            {isUpdated && !isDeleted && (
              <span className="mx-2 text-zinc-500 dark:text-zinc-400">
                (edited)
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
