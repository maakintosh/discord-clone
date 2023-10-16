import { Member } from '@prisma/client'

import { ChatWelcome } from './chat-welcome'

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
  return (
    <div className="flex flex-1 flex-col overflow-y-auto ">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
    </div>
  )
}
