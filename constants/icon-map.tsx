import { Shield, ShieldAlert, User2 } from 'lucide-react'

export const roleIconMap = {
  ADMIN: <ShieldAlert className="mr-1 h-5 w-5 text-emerald-500" />,
  MODERATOR: <Shield className="mr-1 h-5 w-5 text-indigo-500 " />,
  GUEST: <User2 className="mr-1 h-5 w-5 text-zinc-500" />,
}
