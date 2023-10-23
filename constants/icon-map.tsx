import {
  MessagesSquare,
  Mic,
  Shield,
  ShieldAlert,
  User2,
  Video,
} from 'lucide-react'

import { ActionTooltip } from '@/components/action-tooltip'

export const roleIconMap = {
  ADMIN: (
    <ActionTooltip label="ADMIN">
      <ShieldAlert className="mr-1 h-5 w-5 text-emerald-500" />
    </ActionTooltip>
  ),

  MODERATOR: (
    <ActionTooltip label="MODERATOR">
      <Shield className="mr-1 h-5 w-5 text-indigo-500 " />
    </ActionTooltip>
  ),
  GUEST: (
    <ActionTooltip label="GUEST">
      <User2 className="mr-1 h-5 w-5 text-zinc-500" />
    </ActionTooltip>
  ),
}

export const channelTypeIconMap = {
  TEXT: (
    <ActionTooltip label="TEXT">
      <MessagesSquare className="mr-1 h-5 w-5" />
    </ActionTooltip>
  ),
  VOICE: (
    <ActionTooltip label="VOICE">
      <Mic className="mr-1 h-5 w-5" />
    </ActionTooltip>
  ),
  VIDEO: (
    <ActionTooltip label="VIDEO">
      <Video className="mr-1 h-5 w-5" />
    </ActionTooltip>
  ),
}
