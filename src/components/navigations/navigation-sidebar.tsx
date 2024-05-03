import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ModeToggle } from '@/components/mode-toggle'

import { ActionTooltip } from '../action-tooltip'
import { GithubButton } from './github-button'
import { NavigationAction } from './navigation-action'
import { NavigationSidebarItem } from './navigation-sidebar-Item'

export async function NavigationSidebar() {
  const profile = await currentUserProfile()

  if (!profile) {
    return redirect('/servers')
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  return (
    <div className="flex size-full flex-col items-center space-y-4 bg-gray-100 px-1 py-3 dark:bg-gray-900">
      <NavigationAction />
      <Separator className="h-[2px] text-zinc-300 dark:text-zinc-700" />
      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div key={server.id} className="mb-2">
            <NavigationSidebarItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto flex flex-col justify-center gap-y-2">
        <ModeToggle />
        <GithubButton />
        <ActionTooltip label="about" side="right" align="center">
          <Link
            href="/"
            className="relative size-12 items-center overflow-hidden rounded-full"
          >
            <Image
              src="/project-icon.svg"
              alt="project-icon"
              fill
              className="object-cover"
            />
          </Link>
        </ActionTooltip>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-12 w-12 rounded-full overflow-hidden'
            }
          }}
        />
      </div>
    </div>
  )
}
