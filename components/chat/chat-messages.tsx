'use client'

import { Fragment } from 'react'
import { Member, Message, Profile } from '@prisma/client'
import { Loader2, ServerCrash } from 'lucide-react'

import { useChatQuery } from '@/hooks/use-chat-query'

import { ChatWelcome } from './chat-welcome'

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
  member: Member
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
  member,
  name,
}: ChatMessagesProps) {
  const queryKey = `chat:${chatId}`

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    })

  if (status === 'loading') {
    return (
      <div className="my-4 flex flex-1 flex-col items-center justify-center ">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <p className="text-zinc-500">Loading messages...</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="my-4 flex flex-1 flex-col items-center justify-center ">
        <ServerCrash className="h-8 w-8 text-zinc-500" />
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
              <div key={message.id}>{message.content}</div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
