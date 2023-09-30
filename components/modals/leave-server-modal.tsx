'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import { AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'

import { useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function LeaveServerModal() {
  const router = useRouter()
  const { isOpen, onClose, type, data } = useModal()
  const { server } = data

  const isModalOpen = isOpen && type === 'leave-server'

  async function onLeave() {
    try {
      await axios.patch(`/api/servers/${server?.id}/leave`)

      router.refresh()
      toast.success('Successfully left server! 👍')
      onClose()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. 😢')
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
        <DialogHeader className="pt-6">
          <DialogTitle className="text-center text-2xl ">
            Leave this server?
          </DialogTitle>
          <DialogDescription className="text-center">
            <div className="flex items-center justify-center gap-x-2 text-yellow-500">
              <AlertTriangle className="h-5 w-5" />
              <p className="text-lg font-semibold">CAUTION!</p>
            </div>
            You will not be able to rejoin{' '}
            <span className="text-lg font-bold text-indigo-500">
              {server?.name}
            </span>{' '}
            <br />
            unless you are invited again.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="p-4">
          <div className="flex w-full items-center justify-between">
            <Button variant="ghost" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => onLeave()}>
              Leave
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
