import { Shield, ShieldAlert, User2 } from 'lucide-react'

export const roleIconMap = {
  ADMIN: <ShieldAlert className="h-5 w-5 text-emerald-500" />,
  MODERATOR: <Shield className="h-5 w-5 text-indigo-500 " />,
  GUEST: <User2 className="h-5 w-5 text-zinc-500" />,
}
