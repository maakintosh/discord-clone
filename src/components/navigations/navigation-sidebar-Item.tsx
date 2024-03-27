'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { ActionTooltip } from '@/components/action-tooltip'

interface NavigationSidebarItemProps {
  id: string
  name: string
  imageUrl: string
}

export function NavigationSidebarItem({
  id,
  name,
  imageUrl
}: NavigationSidebarItemProps) {
  const router = useRouter()
  const params = useParams()

  return (
    <ActionTooltip label={name} side="right" align="center">
      <button
        onClick={() => router.push(`/servers/${id}`)}
        className="group relative flex items-center"
      >
        {/* active indication bar */}
        <div
          className={cn(
            'absolute left-0 w-1 rounded-r-full bg-primary transition-all',
            params?.serverId !== id && 'group-hover:h-5',
            params?.serverId === id ? 'h-9' : 'h-2'
          )}
        />
        {/* server image button */}
        <div
          className={cn(
            'group relative ml-2 flex size-12 overflow-hidden rounded-full transition-all group-hover:rounded-2xl',
            params?.serverId === id && 'rounded-2xl'
          )}
        >
          <Image fill src={imageUrl} alt={name} />
        </div>
      </button>
    </ActionTooltip>
  )
}
