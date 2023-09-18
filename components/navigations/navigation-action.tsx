'use client'

import { Plus } from 'lucide-react'

import { ActionTooltip } from '@/components/action-tooltip'

export function NavigationAction() {
  return (
    <div>
      <ActionTooltip label="add a server" side="right" align="center">
        <button onClick={() => {}} className="group px-1">
          <div className="flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded-full bg-white dark:bg-gray-800 transition-all group-hover:rounded-xl group-hover:bg-emerald-500">
            <Plus
              size={25}
              className="text-emerald-500 transition group-hover:text-white"
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
