import {
  MessagesSquare,
  Mic,
  Shield,
  ShieldAlert,
  User2,
  Video,
} from 'lucide-react'

export const roleIconMap = {
  ADMIN: <ShieldAlert className="mr-1 h-5 w-5 text-emerald-500" />,
  MODERATOR: <Shield className="mr-1 h-5 w-5 text-indigo-500 " />,
  GUEST: <User2 className="mr-1 h-5 w-5 text-zinc-500" />,
}

export const channelTypeIconMap = {
  TEXT: <MessagesSquare className="mr-1 h-5 w-5" />,
  VOICE: <Mic className="mr-1 h-5 w-5" />,
  VIDEO: <Video className="mr-1 h-5 w-5" />,
}
