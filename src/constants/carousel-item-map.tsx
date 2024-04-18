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
        fill
        className="object-cover"
      />
    )
  },
  {
    title: '2. Invite friends 💌',
    description: 'send them the invite link to make them srver members!',
    icon: <UserPlus2 />,
    component: (
      <Image
        src="/screenshots/invite-friends.png"
        alt="invite-friends"
        fill
        className="object-cover"
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
        fill
        className="object-cover"
      />
    )
  }
]
