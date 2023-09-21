'use client'

import { useState } from 'react'
import axios from 'axios'
import { Check, Copy, RefreshCw } from 'lucide-react'

import { useModal } from '@/hooks/use-modal-store'
import { useOrigin } from '@/hooks/use-origin'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ActionTooltip } from '@/components/action-tooltip'

export function InviteModal() {
  const { isOpen, onClose, onOpen, type, data } = useModal()
  const { server } = data
  const isModalOpen = isOpen && type === 'invite'

  const origin = useOrigin()
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function onCopy() {
    navigator.clipboard.writeText(inviteUrl)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  async function onRefresh() {
    try {
      setIsLoading(true)

      const res = await axios.patch(`/api/servers/${server?.id}/invite-code`)

      onOpen('invite', { server: res.data })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-md bg-slate-800 ">
        <DialogHeader className="p-6">
          <DialogTitle className="text-center text-2xl text-white">
            Invite Friends
          </DialogTitle>
          <DialogDescription className="text-center">
            Send them this link!
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <Label className=" uppercase text-zinc-500">server invite code</Label>
          <div className="flex items-center gap-x-2">
            <Input value={inviteUrl} disabled={isLoading} className="" />
            <ActionTooltip label="copy" side="bottom" align="center">
              <Button
                onClick={onCopy}
                disabled={isLoading}
                variant="primary"
                size="icon"
              >
                {isCopied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </ActionTooltip>
          </div>
          <Button
            onClick={onRefresh}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-zinc-500 "
          >
            Generate a new code
            <RefreshCw className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
