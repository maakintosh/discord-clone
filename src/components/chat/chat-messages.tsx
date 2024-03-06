'use client'

import { ElementRef, Fragment, useRef } from 'react'
import { MessageWithMemberWithProfile } from '@/type'
import { Member } from '@prisma/client'
import { format } from 'date-fns'
import { Loader2, ServerCrash } from 'lucide-react'

import { useChatQuery } from '@/hooks/use-chat-query'
import { useChatScroll } from '@/hooks/use-chat-scroll'
import { useChatSocket } from '@/hooks/use-chat-socket'

import { Button } from '../ui/button'
import { ChatItem } from './chat-item'
import { ChatWelcome } from './chat-welcome'

const DATE_FORMAT = 'MMM d yyyy, HH:mm'

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
  name
}: ChatMessagesProps) {
  const queryKey = `chat:${chatId}`
  const addKey = `chat:${chatId}:messages`
  const updateKey = `chat:${chatId}:messages:update`

  const chatRef = useRef<ElementRef<'div'>>(null)
  const bottomRef = useRef<ElementRef<'div'>>(null)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue
    })
  useChatSocket({ addKey, updateKey, queryKey })
  useChatScroll({
    chatRef,
    bottomRef,
    loadMoreFn: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0
  })

  if (status === 'loading') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center ">
        <Loader2 className="my-4 size-8 animate-spin text-zinc-500" />
        <p className="text-zinc-500">Loading messages...</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center ">
        <ServerCrash className="my-4 size-8 text-zinc-500" />
        <p className="text-zinc-500">Something went wrong!</p>
      </div>
    )
  }

  return (
    <div ref={chatRef} className="flex flex-1 flex-col overflow-y-auto py-4 ">
      {/* renders these 2 components if messages are less than 10 */}
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}

      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="my-4 size-5 animate-spin text-zinc-500" />
          ) : (
            <Button
              onClick={() => fetchNextPage()}
              variant={'outline'}
              size={'sm'}
            >
              Load more
            </Button>
          )}
        </div>
      )}
      <div className="mt-auto flex flex-col-reverse">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                content={message.content}
                isDeleted={message.isDeleted}
                fileUrl={message.fileUrl}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.createdAt !== message.updatedAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                messageOwnerMember={message.member}
                currentUserMember={currentUserMember}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  )
}
