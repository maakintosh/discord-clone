'use client'

import { useState } from 'react'
import axios from 'axios'
import { AlertTriangle } from 'lucide-react'
import qs from 'query-string'
import toast from 'react-hot-toast'

import { useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export function DeleteMessageModal() {
  const { isOpen, onClose, type, data } = useModal()
  const { apiUrl, query } = data

  const isModalOpen = isOpen && type === 'delete-message'

  const [isLoading, setIsLoading] = useState(false)

  async function onDelete() {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query
      })

      await axios.delete(url)

      toast.success('Successfully deleted message! 👍')
      onClose()
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
            Delete this message?
          </DialogTitle>
          <DialogDescription className="text-center">
            <div className="flex items-center justify-center gap-x-2 text-red-500">
              <AlertTriangle className="size-5" />
              <p className="text-lg font-semibold">DANGER!</p>
            </div>
            this action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="p-4">
          <div className="flex w-full items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => onClose()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => onDelete()}
              disabled={isLoading}
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
