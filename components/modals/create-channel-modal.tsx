'use client'

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
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const formSchema = z.object({
  // requires the input name to be a non-empty string and not equal to the string "general".
  name: z
    .string()
    .nonempty({ message: 'Channel name is required' })
    .refine((name) => name !== 'general', {
      message: 'New channel name cannot be general',
    }),
  type: z.nativeEnum(ChannelType),
})

export function CreateChannelModal() {
  const router = useRouter()
  const { isOpen, onClose, type, data } = useModal()
  const { server } = data

  const isModalOpen = isOpen && type === 'create-channel'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: ChannelType.TEXT,
    },
  })

  const isLoding = form.formState.isSubmitting

  function handleClose() {
    form.reset()
    onClose()
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = qs.stringifyUrl({
        url: '/api/channels/',
        query: {
          serverId: server?.id,
        },
      })

      await axios.post(url, values)

      form.reset()
      router.refresh()
      toast.success('Successfully created channel! 🎉')
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
          <DialogTitle className="text-center text-2xl  ">
            Create a channel
          </DialogTitle>
          <DialogDescription className="text-center">
            Choose from Text, Voice or Video
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
                      defaultValue={field.value}
                      disabled={isLoding}
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
                      disabled={isLoding}
                      placeholder="Enter a server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <DialogFooter className="">
              <Button type="submit" disabled={isLoding} variant={'primary'}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
