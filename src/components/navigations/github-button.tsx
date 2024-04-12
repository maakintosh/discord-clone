'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Code2, FolderKanban } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function GithubButton() {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-12 overflow-hidden rounded-full border-2"
          style={{ width: 48, height: 48 }}
        >
          <Image src="/github.png" alt="Github" fill className="object-cover" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 space-y-1 font-medium">
        <DropdownMenuItem
          onClick={() =>
            router.push('https://github.com/maakintosh/discord-clone')
          }
          className=""
        >
          Code
          <Code2 className="ml-auto size-5" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            router.push('https://github.com/users/maakintosh/projects/6')
          }
          className=""
        >
          Project
          <FolderKanban className="ml-auto size-5" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
