import { useEffect } from 'react'
import { Member, Message, Profile } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'

import { useSocket } from '@/components/providers/socket-provider'

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile
  }
}

interface UseChatSocketProps {
  addKey: string
  updateKey: string
  queryKey: string
}

export function useChatSocket({
  addKey,
  updateKey,
  queryKey,
}: UseChatSocketProps) {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return

    // 1. We can get the data from the query cache using the `queryKey` and `getQueryData` method.
    // 2. We check if the data exists, and if there are pages in the data.
    // 3. We map over the pages and the items within the pages.We check if the item id matches the id of the item we are updating.
    // 4. If the id matches, we return the new data.Otherwise, we return the old data.
    socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message
              }

              return item
            }),
          }
        })

        return {
          ...oldData,
          pages: newData,
        }
      })
    })

    // 1. We get the current data from the queryClient with the queryKey.
    // 2. We check if the data is empty or not.If it’s empty, we return a new object with the first page containing the new message.
    // 3. If the data is not empty, we create a new array from the pages array and add the new message to the first page.
    socket.on(addKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [{ items: [message] }],
          }
        }

        const newData = [...oldData.pages]

        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items],
        }

        return {
          ...oldData,
          pages: newData,
        }
      })
    })

    return () => {
      socket.off(updateKey)
      socket.off(addKey)
    }
  }, [addKey, queryClient, queryKey, socket, updateKey])
}
