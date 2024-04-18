'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Code2, FolderKanban } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function GithubButton() {
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
      <DropdownMenuContent className="w-8 space-y-1 font-medium">
        <DropdownMenuItem>
          <Link
            href={'https://github.com/maakintosh/discord-clone'}
            target="_blank"
            className="w-full"
          >
            <div className="flex items-center justify-between">
              Code
              <Code2 />
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={'https://github.com/users/maakintosh/projects/6'}
            target="_blank"
            className="w-full"
          >
            <div className="flex items-center justify-between">
              Project
              <FolderKanban />
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
