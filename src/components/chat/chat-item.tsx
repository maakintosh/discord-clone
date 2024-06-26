'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { roleIconMap } from '@/constants/icon-map'
import { zodResolver } from '@hookform/resolvers/zod'
import { Member, MemberRole, Profile } from '@prisma/client'
import axios from 'axios'
import { Edit, FileIcon, Trash } from 'lucide-react'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ActionTooltip } from '@/components/action-tooltip'
import { UserAvatar } from '@/components/user-avatar'

interface ChatItemProps {
  id: string
  content: string
  isDeleted: boolean
  fileUrl: string | null
  timestamp: string
  isUpdated: boolean
  socketUrl: string
  socketQuery: Record<string, string>
  messageOwnerMember: Member & {
    profile: Profile
  }
  currentUserMember: Member
}

const formSchema = z.object({
  content: z.string().min(1, { message: 'Message cannot be empty' })
})

export function ChatItem({
  id,
  content,
  isDeleted,
  fileUrl,
  timestamp,
  isUpdated,
  socketUrl,
  socketQuery,
  messageOwnerMember,
  currentUserMember
}: ChatItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const { onOpen } = useModal()

  // users can press escape to cancel editing
  useEffect(() => {
    function commandEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        setIsEditing(false)
      }
    }

    document.addEventListener('keydown', commandEscape)

    return () => {
      document.removeEventListener('keydown', commandEscape)
    }
  }, [])

  async function onMemberClick() {
    if (messageOwnerMember.id === currentUserMember.id) return
    router.push(
      `/servers/${messageOwnerMember.serverId}/conversations/${messageOwnerMember.id}`
    )
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content
    }
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery
      })

      await axios.patch(url, values)

      form.reset()
      toast.success('Successfully edited message! 👍')
      setIsEditing(false)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. 😢')
    }
  }

  useEffect(() => {
    form.reset({
      content
    })
  }, [content, form])

  const isAdmin = currentUserMember.role === MemberRole.ADMIN
  const isModerator = currentUserMember.role === MemberRole.MODERATOR
  const isMessageOwner = currentUserMember.id === messageOwnerMember.id
  const canEditMessage = !isDeleted && isMessageOwner
  const canDeleteMessage =
    !isDeleted && (isMessageOwner || isAdmin || isModerator)

  const fileType = fileUrl?.split('.').pop()
  const isPDF = fileUrl && fileType === 'pdf'
  const isImage = fileUrl && fileType !== 'pdf'

  return (
    <div className="group m-1 flex gap-x-1 rounded-md  p-2 hover:bg-gray-300/80 dark:hover:bg-gray-700/80">
      <div onClick={onMemberClick} className="cursor-pointer">
        <UserAvatar src={messageOwnerMember.profile.imageUrl} />
      </div>
      <div className=" flex h-full flex-col gap-y-1">
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
            <div className="ml-4 flex items-center gap-x-2 group-hover:flex md:hidden">
              {canEditMessage && (
                <ActionTooltip label="edit">
                  <Edit
                    onClick={() => setIsEditing(!isEditing)}
                    className="size-5 cursor-pointer text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400"
                  />
                </ActionTooltip>
              )}
              <ActionTooltip label="delete">
                <Trash
                  onClick={() =>
                    onOpen('delete-message', {
                      apiUrl: `${socketUrl}/${id}`,
                      query: socketQuery
                    })
                  }
                  className="size-5 cursor-pointer text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400"
                />
              </ActionTooltip>
            </div>
          )}
        </div>
        {isImage && (
          <Link
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className=" md:h-90 md:w-90 relative mx-2 flex aspect-square size-64 items-center overflow-hidden rounded-md"
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
            <Link
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className=" flex items-center justify-center gap-x-3 text-sm text-indigo-500 hover:underline dark:text-indigo-400"
            >
              <FileIcon className="size-10 fill-indigo-200 stroke-indigo-400" />
              <p>.pdf</p>
            </Link>
          </div>
        )}
        {!fileUrl && !isEditing && (
          <p
            className={cn(
              'mx-2 text-sm text-zinc-600 dark:text-zinc-300',
              isDeleted && 'text-xs italic text-zinc-500 dark:text-zinc-400'
            )}
          >
            {isUpdated && !isDeleted && (
              <span className="mx-2 text-xs italic text-zinc-500 dark:text-zinc-400">
                (edited)
              </span>
            )}
            {content}
          </p>
        )}
        {!isDeleted && isEditing && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center gap-x-2">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Edit your message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} variant={'primary'} size={'sm'}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  )
}
