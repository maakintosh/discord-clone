'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Video, VideoOff } from 'lucide-react'
import qs from 'query-string'

import { Button } from '@/components/ui/button'
import { ActionTooltip } from '@/components/action-tooltip'

export function ConversationVideoButton() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const isVideo = searchParams?.get('video')
  const Icon = isVideo ? VideoOff : Video
  const tooltipLabel = isVideo ? 'finish video' : 'start video'

  function onClick() {
    const url = qs.stringifyUrl(
      {
        url: pathname || '',
        query: {
          video: isVideo ? undefined : true
        }
      },
      // if a query parameter's value is null or undefined, it will not be included in the resulting stringified URL.
      { skipNull: true }
    )

    router.push(url)
  }

  return (
    <ActionTooltip label={tooltipLabel} side="bottom">
      <Button onClick={onClick} size="sm" variant="ghost">
        <Icon className="size-6 text-zinc-500" />
      </Button>
    </ActionTooltip>
  )
}
