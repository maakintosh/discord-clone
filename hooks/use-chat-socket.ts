import { useEffect } from 'react'
import { MessageWithMemberWithProfile } from '@/type'
import { useQueryClient } from '@tanstack/react-query'

import { useSocket } from '@/components/providers/socket-provider'

interface UseChatSocketProps {
  addKey: string
  updateKey: string
  queryKey: string
}

// abstracts the logic of managing chat messages, making it easier to maintain and test. It also improves the performance by reducing unnecessary re-renders, thanks to the efficient caching and data management of React Query.
export function useChatSocket({
  addKey,
  updateKey,
  queryKey
}: UseChatSocketProps) {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    // triggered when a message update event is received from the socket. It updates the corresponding message in the query data.
    function handleUpdate(message: MessageWithMemberWithProfile) {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData
        }

        const newData = oldData.pages.map((page: any) => {
          if (!page.items) {
            return page
          }

          return {
            ...page,
            items: page.items.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message
              }

              return item
            })
          }
        })
        return {
          ...oldData,
          pages: newData
        }
      })
    }

    // triggered when a new message event is received from the socket. It adds the new message to the beginning of the messages list in the query data.
    function handleAdd(message: MessageWithMemberWithProfile) {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                items: [message]
              }
            ]
          }
        }

        const newData = [...oldData.pages]

        if (!Array.isArray(newData[0].items)) {
          newData[0].items = []
        }

        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items]
        }

        return {
          ...oldData,
          pages: newData
        }
      })
    }

    if (!socket) return

    socket.on(updateKey, handleUpdate)
    socket.on(addKey, handleAdd)

    return () => {
      socket.off(updateKey, handleUpdate)
      socket.off(addKey, handleAdd)
    }
  }, [addKey, queryClient, queryKey, socket, updateKey])
}
