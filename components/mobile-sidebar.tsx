import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { NavigationSidebar } from '@/components/navigations/navigation-sidebar'
import { ServerSidebar } from '@/components/server/server-sidebar'

interface MobileSidebarProps {
  serverId: string
}

export function MobileSidebar({ serverId }: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className="mr-1 md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className="flex gap-0 p-0">
        <section className="w-[72px]">
          <NavigationSidebar />
        </section>
        <section className="w-60">
          <ServerSidebar serverId={serverId} />
        </section>
      </SheetContent>
    </Sheet>
  )
}
