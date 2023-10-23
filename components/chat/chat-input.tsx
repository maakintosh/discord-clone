'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Plus } from 'lucide-react'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { useModal } from '@/hooks/use-modal-store'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EmojiPicker } from '@/components/emoji-picker'

interface ChatInputProps {
  type: 'channel' | 'conversation'
  apiUrl: string
  query: Record<string, any>
  name: string
}

const formSchema = z.object({
  content: z.string().nonempty({ message: 'Message cannot be empty' }),
})

export function ChatInput({ type, apiUrl, query, name }: ChatInputProps) {
  const router = useRouter()
  const { onOpen } = useModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      })

      await axios.post(url, values)

      form.reset()
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. 😢')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* TODO: make chat-imput fixed to bottom */}
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen('message-file', { apiUrl, query })}
                    disabled={isLoading}
                    className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-400 hover:bg-zinc-500"
                  >
                    <Plus className="text-white dark:text-black" />
                  </button>
                  <Input
                    disabled={isLoading}
                    placeholder={
                      type === 'conversation'
                        ? `Message ${name}`
                        : `Message #${name}`
                    }
                    className="bg-gray-200 px-14 py-6
                   text-zinc-500 dark:bg-gray-800 dark:text-zinc-300"
                    {...field}
                  />
                  <div className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
