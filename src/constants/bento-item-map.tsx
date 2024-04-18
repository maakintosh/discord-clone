import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, ShieldAlert, User2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

export type BentoGridItemProps = {
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  component?: React.ReactNode
  className?: string
}

export const bentoGridItems: BentoGridItemProps[] = [
  {
    title: 'Real-time Chat ⚡️',
    description: 'send and receive messages instantly without refreshing page',
    component: (
      <Image
        src="/screenshots/create-server.png"
        width={200}
        height={200}
        alt="create-server"
      />
    )
  },
  {
    title: 'Video 🖥️ / Voice 🎙️ channel',
    description: 'start or join video/voice call',
    component: (
      <Image
        src="/screenshots/create-server.png"
        width={200}
        height={200}
        alt="create-server"
      />
    )
  },
  {
    title: '1on1 DM 🤝',
    description: 'have a talk directly with members',
    component: (
      <Image
        src="/screenshots/create-server.png"
        width={200}
        height={200}
        alt="create-server"
      />
    )
  },
  {
    title: 'Upload images 🏞️ or PDFs 📑',
    description: 'you can upload less than 2MB files',
    component: (
      <Image
        src="/screenshots/create-server.png"
        width={200}
        height={200}
        alt="create-server"
      />
    )
  },
  {
    title: 'Manage your server members 👥',
    description:
      'the creater of the server (ADMIN) can assign "role" to each member',
    component: ServerMembersBentoComponent(),
    className: 'md:col-span-2'
  }
]

function ServerMembersBentoComponent() {
  const firstVariants = {
    initial: {
      x: 20,
      rotate: -5
    },
    hover: {
      x: 0,
      rotate: 0
    }
  }
  const secondVariants = {
    initial: {
      x: -20,
      rotate: 5
    },
    hover: {
      x: 0,
      rotate: 0
    }
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-[6rem] flex-1 flex-row space-x-2"
    >
      <motion.div
        variants={firstVariants}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-2 dark:border-white/[0.1] dark:bg-black"
      >
        <User2 className="size-8 text-zinc-500" />
        <Badge variant={'guest'}>GUEST</Badge>
        <ul className="mt-2 gap-y-1 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
        </ul>
      </motion.div>
      <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-2 dark:border-white/[0.1] dark:bg-black">
        <ShieldAlert className="size-8 text-emerald-500 " />
        <Badge variant={'admin'}>ADMIN</Badge>
        <ul className="mt-2 gap-y-1 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
          <li>invite friends</li>
          <li>create channel</li>
          <li>delete comment</li>
          <li>manage members</li>
          <li>server settings</li>
          <li>delete server</li>
        </ul>
      </motion.div>
      <motion.div
        variants={secondVariants}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-2 dark:border-white/[0.1] dark:bg-black"
      >
        <Shield className="size-8 text-indigo-500" />
        <Badge variant={'moderator'}>MODERATOR</Badge>
        <ul className="mt-2 gap-y-1 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
          <li>invite friends</li>
          <li>create channel</li>
          <li>delete comment</li>
        </ul>
      </motion.div>
    </motion.div>
  )
}
