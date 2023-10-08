'use client'

import { Plus } from 'lucide-react'

import { useModal } from '@/hooks/use-modal-store'
import { ActionTooltip } from '@/components/action-tooltip'

export function NavigationAction() {
  const { onOpen } = useModal()
  return (
    <ActionTooltip label="add a server" side="right" align="center">
      <button
        onClick={() => {
          onOpen('create-server')
        }}
        className="group px-1"
      >
        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full border-2 bg-white transition-all group-hover:rounded-xl group-hover:bg-emerald-500 dark:bg-gray-800">
          <Plus
            size={25}
            className="text-emerald-500 transition group-hover:text-white"
          />
        </div>
      </button>
    </ActionTooltip>
  )
}
