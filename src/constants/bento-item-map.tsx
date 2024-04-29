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
    description: 'send and receive messages instantly without refreshing page!',
    component: (
      <Image
        src="/screenshots/chatdemo-app.png"
        height={256}
        width={256}
        className="aspect-square w-full overflow-hidden rounded-lg border border-zinc-300 object-cover dark:border-zinc-700"
        alt="create-server"
      />
    )
  },
  {
    title: 'Video 🖥️ / Voice 🎙️ channel',
    description: 'start or join video/voice call!',
    component: (
      <Image
        src="/screenshots/video-voice-chat.png"
        height={256}
        width={256}
        className="w-full overflow-hidden rounded-lg border border-zinc-300 object-cover dark:border-zinc-700"
        alt="create-server"
      />
    )
  },
  {
    title: '1on1 DM 🤝',
    description: 'send direct-messages to server member!',
    component: (
      <Image
        src="/screenshots/1on1-dm.png"
        height={256}
        width={256}
        className="aspect-square w-full overflow-hidden rounded-lg border border-zinc-300 object-cover dark:border-zinc-700"
        alt="create-server"
      />
    )
  },
  {
    title: 'Upload images 🏞️ or PDFs 📄',
    description: 'you can upload less than 2MB files!',
    component: (
      <Image
        src="/screenshots/upload-file.png"
        height={256}
        width={256}
        className="aspect-square w-full overflow-hidden rounded-lg border border-zinc-300 object-cover dark:border-zinc-700"
        alt="create-server"
      />
    )
  },
  {
    title: 'Manage server members 👥',
    description:
      'the creater of the server (ADMIN) can assign "role" to each member',
    component: ServerMembersBentoComponent(),
    className: 'md:col-span-2'
  }
]

function ServerMembersBentoComponent() {
  const firstVariants = {
    initial: {
      x: 0,
      rotate: 0
    },
    hover: {
      x: -30,
      rotate: -10
    }
  }
  const secondVariants = {
    initial: {
      x: 0,
      rotate: 0
    },
    hover: {
      x: 30,
      rotate: 10
    }
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex size-full flex-1 justify-between gap-2 max-sm:flex-col md:col-span-2"
    >
      <div className="flex size-full flex-col justify-center md:w-2/5">
        <motion.div
          variants={firstVariants}
          className="flex size-full flex-col items-center justify-center rounded-2xl border border-zinc-300 bg-white p-2 bg-dot-black/[0.3] dark:border-zinc-700 dark:bg-black dark:bg-dot-white/[0.3]"
        >
          <User2 className="size-8 text-zinc-500" />
          <Badge variant={'guest'}>GUEST</Badge>
          <ul className="mt-2 gap-y-1 text-center text-sm font-semibold text-neutral-500"></ul>
        </motion.div>
        <motion.div
          variants={firstVariants}
          className="flex size-full flex-col items-center justify-center rounded-2xl border border-zinc-300 bg-white p-2 bg-dot-black/[0.3] dark:border-zinc-700 dark:bg-black dark:bg-dot-white/[0.3]"
        >
          <Shield className="size-8 text-indigo-500" />
          <Badge variant={'moderator'}>MODERATOR</Badge>
          <ul className="mt-2 gap-y-1 text-center text-sm font-semibold text-neutral-500">
            <li>invite friends</li>
            <li>create channel</li>
            <li>delete comment</li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        variants={secondVariants}
        className="flex size-full flex-col items-center justify-center rounded-2xl border border-zinc-300 bg-white p-2 bg-dot-black/[0.3] dark:border-zinc-700 dark:bg-black dark:bg-dot-white/[0.3] md:w-3/5"
      >
        <ShieldAlert className="size-8 text-emerald-500 " />
        <Badge variant={'admin'}>ADMIN</Badge>
        <ul className="mt-2 gap-y-1 text-center text-sm font-semibold text-neutral-500">
          <li>invite friends</li>
          <li>create channel</li>
          <li>delete comment</li>
          <li className="text-emerald-500 ">change member role</li>
          <li className="text-emerald-500 ">kickout members</li>
          <li className="text-emerald-500 ">server settings</li>
          <li className="text-emerald-500 ">delete server</li>
        </ul>
      </motion.div>
    </motion.div>
  )
}
