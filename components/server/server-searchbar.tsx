'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Command, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { UserAvatar } from '@/components/user-avatar'

interface ServerSearchbarProps {
  searchData: {
    label: string
    type: 'member' | 'channel'
    data:
      | {
          id: string
          name: string
          icon: React.ReactNode
          avatarImage?: string
        }[]
      | undefined
  }[]
}

export function ServerSearchbar({ searchData }: ServerSearchbarProps) {
  const router = useRouter()
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function commandK(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }

    document.addEventListener('keydown', commandK)

    return () => document.removeEventListener('keydown', commandK)
  }, [isOpen])

  function onClick({ type, id }: { type: 'member' | 'channel'; id: string }) {
    setIsOpen(false)
    if (type === 'member') {
      return router.push(`/servers/${params.serverId}/conversations/${id}`)
    }
    if (type === 'channel') {
      return router.push(`/servers/${params.serverId}/channels/${id}`)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className=" flex w-full items-center p-2 text-muted-foreground"
        variant="outline"
      >
        <Search className="mr-1 h-5 w-5 " />
        <p className=" font-semibold ">Search</p>
        <kbd className=" pointer-events-none ml-auto inline-flex select-none items-center gap-1 rounded border">
          <Command className="h-3 w-3" />K
        </kbd>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search all Channels and Members." />
        <CommandList>
          <CommandEmpty>No results found.. 🙁</CommandEmpty>
          {searchData.map(({ label, type, data }) => {
            if (!searchData?.length) return null
            return type === 'channel' ? (
              <CommandGroup key={label} heading={label} className="">
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                  {data?.map(({ id, name, icon }) => (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ type, id })}
                    >
                      <div className="flex items-center">
                        <p>{icon}</p>
                        <p className="ml-1">{name}</p>
                      </div>
                    </CommandItem>
                  ))}
                </div>
              </CommandGroup>
            ) : (
              <CommandGroup key={label} heading={label} className="">
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                  {data?.map(({ id, name, icon, avatarImage }) => (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ type, id })}
                    >
                      <div className="flex items-center">
                        <UserAvatar src={avatarImage} />
                        <div className="ml-2 flex flex-col gap-y-1">
                          <p>{icon}</p>
                          <p className="">{name}</p>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </div>
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
