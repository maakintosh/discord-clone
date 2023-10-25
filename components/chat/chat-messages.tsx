'use client'

import { Fragment } from 'react'
import { Member, Message, Profile } from '@prisma/client'
import { format } from 'date-fns'
import { Loader2, ServerCrash } from 'lucide-react'

import { useChatQuery } from '@/hooks/use-chat-query'
import { useChatSocket } from '@/hooks/use-chat-socket'

import { ChatItem } from './chat-item'
import { ChatWelcome } from './chat-welcome'

const DATE_FORMAT = 'MMM d yyyy, HH:mm'

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile
  }
}

interface ChatMessagesProps {
  type: 'channel' | 'conversation'
  apiUrl: string
  socketUrl: string
  socketQuery: Record<string, string>
  paramKey: 'channelId' | 'conversationId'
  paramValue: string
  chatId: string
  currentUserMember: Member
  name: string
}

export function ChatMessages({
  type,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  chatId,
  currentUserMember,
  name,
}: ChatMessagesProps) {
  const queryKey = `chat:${chatId}`
  const addKey = `chat:${chatId}:messages`
  const updateKey = `chat:${chatId}:messages:update`

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    })
  useChatSocket({ addKey, updateKey, queryKey })

  if (status === 'loading') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center ">
        <Loader2 className="my-4 h-8 w-8 animate-spin text-zinc-500" />
        <p className="text-zinc-500">Loading messages...</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center ">
        <ServerCrash className="my-4 h-8 w-8 text-zinc-500" />
        <p className="text-zinc-500">Something went wrong!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto ">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
      <div className="mt-auto flex flex-1 flex-col-reverse">
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.messages.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                id={message.id}
                content={message.content}
                isDeleted={message.isDeleted}
                fileUrl={message.fileUrl}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.updatedAt !== message.createdAt}
                messageOwnerMember={message.member}
                currentUserMember={currentUserMember}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
