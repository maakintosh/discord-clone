'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { channelTypeIconMap } from '@/constants/icon-map'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChannelType } from '@prisma/client'
import axios from 'axios'
import qs from 'query-string'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const formSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'Channel name is required' })
    .refine((name) => name !== 'general', {
      message: 'New channel name cannot be general'
    }),
  type: z.nativeEnum(ChannelType)
})

export function EditChannelModal() {
  const router = useRouter()
  const { isOpen, onClose, type, data } = useModal()
  const { server, channel } = data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: channel?.type || ChannelType.TEXT
    }
  })

  useEffect(() => {
    if (channel) {
      form.setValue('type', channel.type)
      form.setValue('name', channel.name)
    }
  }, [channel, form])

  const isLoading = form.formState.isSubmitting
  const isModalOpen = isOpen && type === 'edit-channel'

  function handleClose() {
    form.reset()
    onClose()
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      })
      await axios.patch(url, values)

      form.reset()
      router.refresh()
      toast.success('Successfully updated channel! 👍')
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
            Edit your channel
          </DialogTitle>
          <DialogDescription className="text-center">
            Change channel name.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-2 md:p-4"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-zinc-500">
                    channel type
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={channel?.type}
                      disabled={isLoading}
                      className="flex justify-center space-x-4"
                    >
                      <FormItem className="flex items-center space-x-1">
                        <FormControl>
                          <RadioGroupItem value={ChannelType.TEXT} />
                        </FormControl>
                        <FormLabel className="flex items-center gap-x-1 text-lg ">
                          {channelTypeIconMap[ChannelType.TEXT]}
                          Text
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1">
                        <FormControl>
                          <RadioGroupItem value={ChannelType.VOICE} />
                        </FormControl>
                        <FormLabel className="flex items-center gap-x-1 text-lg ">
                          {channelTypeIconMap[ChannelType.VOICE]}
                          Voice
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1">
                        <FormControl>
                          <RadioGroupItem value={ChannelType.VIDEO} />
                        </FormControl>
                        <FormLabel className="flex items-center gap-x-1 text-lg ">
                          {channelTypeIconMap[ChannelType.VIDEO]}
                          Video
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-zinc-500">
                    channel name
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
