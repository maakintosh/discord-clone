'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import { FileUploader } from '@/components/file-uploader'

const formSchema = z.object({
  name: z.string().nonempty({ message: 'Server name is required' }),
  imageUrl: z.string().nonempty({ message: 'Server image is required' }),
})

export function InitialModal() {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  const isLoding = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post('/api/servers', values)

      form.reset()
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <Dialog open>
      <DialogContent className="rounded-md bg-slate-800 ">
        <DialogHeader className="p-6">
          <DialogTitle className="text-center text-2xl ">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center">
            You can always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center">
                  <FormLabel className="uppercase text-zinc-500">
                    server image
                  </FormLabel>
                  <FormControl className=" flex flex-col justify-center">
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
                      disabled={isLoding}
                      placeholder="Enter a server name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <DialogFooter className="py-6">
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
