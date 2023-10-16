import { AtSign, Hash } from 'lucide-react'

interface ChatWelcomeProps {
  type: 'channel' | 'conversation'
  name: string
}

export function ChatWelcome({ type, name }: ChatWelcomeProps) {
  return (
    <div className="mb-4 flex items-center space-x-2 space-y-1 px-2">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-transparent">
        {type === 'channel' ? (
          <Hash className="h-12 w-12 text-zinc-500 dark:text-zinc-300" />
        ) : (
          <AtSign className="h-12 w-12 text-zinc-500 dark:text-zinc-300" />
        )}
      </div>
      <p className="text-lg text-zinc-500 dark:text-zinc-300 md:text-2xl">
        {type === 'channel' && `Welcome to #${name} channel!`}
        {type === 'conversation' && `Let's chat with ${name}!`}
      </p>
    </div>
  )
}
