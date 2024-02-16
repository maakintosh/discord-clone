'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FileUploader } from '@/components/file-uploader'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Server name is required' }),
  imageUrl: z.string().min(1, { message: 'Server image is required' })
})

export function EditServerModal() {
  const router = useRouter()
  const { isOpen, onClose, type, data } = useModal()
  const { server } = data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: ''
    }
  })

  useEffect(() => {
    if (server) {
      form.setValue('name', server.name)
      form.setValue('imageUrl', server.imageUrl)
    }
  }, [server, form])

  const isLoading = form.formState.isSubmitting
  const isModalOpen = isOpen && type === 'edit-server'

  function handleClose() {
    form.reset()
    onClose()
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(`/api/servers/${server?.id}`, values)

      form.reset()
      router.refresh()
      toast.success('Successfully updated server! 👍')
      onClose()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. 😢')
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
        <DialogHeader className="pt-6">
          <DialogTitle className="text-center text-2xl ">
            Edit your server
          </DialogTitle>
          <DialogDescription className="text-center">
            Change server name and image.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-2 md:p-4"
          >
            <div className="flex items-center justify-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUploader
                        endpoint="serverImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-zinc-500">
                    server name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter a server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <DialogFooter className="">
              <Button type="submit" disabled={isLoading} variant={'primary'}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
