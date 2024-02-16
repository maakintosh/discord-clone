'use client'

import { useState } from 'react'
import axios from 'axios'
import { Check, Copy, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

import { useModal } from '@/hooks/use-modal-store'
import { useOrigin } from '@/hooks/use-origin'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
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
    toast.success('Copied! 👍')

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  async function onRefresh() {
    try {
      setIsLoading(true)

      const res = await axios.patch(`/api/servers/${server?.id}/invite-code`)

      toast.success('New invite link generated! 👍')
      onOpen('invite', { server: res.data })
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. 😢')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
        <DialogHeader className="pt-6">
          <DialogTitle className="text-center text-2xl ">
            Invite Friends
          </DialogTitle>
          <DialogDescription className="text-center">
            Send them this link!
            <br />
            They can automatically join your server. wow.
          </DialogDescription>
        </DialogHeader>
        <div className="p-2 md:p-4">
          <Label className=" uppercase text-zinc-500">server invite link</Label>
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
                  <Check className="size-5" />
                ) : (
                  <Copy className="size-5" />
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
            Generate a new link
            <RefreshCw className="ml-2 size-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
