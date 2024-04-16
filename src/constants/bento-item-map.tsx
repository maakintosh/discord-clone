import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ImagePlus,
  MessagesSquare,
  Shield,
  ShieldAlert,
  User2,
  Users2,
  Video,
  Zap
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'

export type BentoGridItemProps = {
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  icon?: React.ReactNode
  header?: React.ReactNode
  className?: string
}

export const bentoGridItems: BentoGridItemProps[] = [
  {
    title: 'Real-time Chat ⚡️',
    description: 'send and receive messages instantly without refreshing page',
    icon: <Zap />,
    header: (
      <Image
        src="/screenshots/create-server.png"
        width={500}
        height={500}
        alt="create-server"
      />
    )
  },
  {
    title: 'Video 🖥️ or Voice call 🎙️',
    description: 'start video/voice chat',
    icon: <Video />,
    header: (
      <Image
        src="/screenshots/create-server.png"
        width={500}
        height={500}
        alt="create-server"
      />
    )
  },
  {
    title: '1on1 DM 🤝',
    description: 'have a talk directly with members',
    icon: <MessagesSquare />,
    header: (
      <Image
        src="/screenshots/create-server.png"
        width={500}
        height={500}
        alt="create-server"
      />
    )
  },
  {
    title: 'Manage your server members 👥',
    description:
      'the creater of the server (ADMIN) can assign "roles" to each member according to their permissions within the server.',
    icon: <Users2 />,
    header: ServerMemberBentoHeader(),
    className: 'row-span-2'
  },
  {
    title: 'Upload images 🏞️ or PDFs 📑',
    description: 'you can upload less than 2MB files',
    icon: <ImagePlus />,
    header: (
      <Image
        src="/screenshots/create-server.png"
        width={500}
        height={500}
        alt="create-server"
      />
    )
  }
]

function ServerMemberBentoHeader() {
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
        <User2 className="text-zinc-500" />
        <ul className="mt-2 gap-y-1 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
          <li>leave server</li>
        </ul>
        <Badge variant={'guest'}>GUEST</Badge>
      </motion.div>
      <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black">
        <ShieldAlert className=" text-emerald-500 " />
        <ul className="mt-2 gap-y-1 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
          <li>leave server</li>
          <li>leave server</li>
          <li>leave server</li>
          <li>leave server</li>
          <li>leave server</li>
        </ul>
        <Badge variant={'admin'}>ADMIN</Badge>
      </motion.div>
      <motion.div
        variants={secondVariants}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
      >
        <Shield className="text-indigo-500" />
        <ul className="mt-2 gap-y-1 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
          <li>leave server</li>
          <li>leave server</li>
          <li>leave server</li>
        </ul>
        <Badge variant={'moderator'}>MODERATOR</Badge>
      </motion.div>
    </motion.div>
  )
}
