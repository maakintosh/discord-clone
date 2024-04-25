import Image from 'next/image'
import { Home, UserPlus2, Users2 } from 'lucide-react'

export type CarouselItemProps = {
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  icon?: React.ReactNode
  component?: React.ReactNode
  className?: string
}

export const carouselItems: CarouselItemProps[] = [
  {
    title: '1. Create your own server 🏠',
    description:
      'server is a private place where you can communicate with members',
    icon: <Home />,
    component: (
      <Image
        src="/screenshots/create-server.png"
        alt="create-server"
        height={256}
        width={256}
        className="aspect-square w-full overflow-hidden rounded-lg border border-zinc-700 object-cover"
      />
    )
  },
  {
    title: '2. Invite friends 💌',
    description: 'send them the invite link to welcome server members!',
    icon: <UserPlus2 />,
    component: (
      <Image
        src="/screenshots/invite-friends.png"
        alt="invite-friends"
        height={256}
        width={256}
        className="aspect-square w-full overflow-hidden rounded-lg border border-zinc-700 object-cover"
      />
    )
  },
  {
    title: `3. That's it! 🎉`,
    description: 'enjoy chatting with members all over the world!',
    icon: <Users2 />,
    component: (
      <Image
        src="/screenshots/chatdemo-app.png"
        alt="chatdemo-app"
        height={256}
        width={256}
        className="aspect-square w-full overflow-hidden rounded-lg border border-zinc-700 object-cover"
      />
    )
  }
]
