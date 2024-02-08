import { useEffect, useState } from 'react'

interface useChatScrollProps {
  chatRef: React.RefObject<HTMLDivElement>
  bottomRef: React.RefObject<HTMLDivElement>
  shouldLoadMore: boolean
  loadMoreFn: () => void
  count: number
}

export function useChatScroll({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMoreFn,
  count
}: useChatScrollProps) {
  const [hasInitialized, setHasInitialized] = useState(false)

  // automatically loads more messages if
  // 1.the user is at the top of the displayed chat messages component, and
  // 2.there are still more messages to load
  useEffect(() => {
    const topDiv = chatRef?.current

    function autoLoad() {
      const scrollTop = topDiv?.scrollTop
      if (scrollTop === 0 && shouldLoadMore) {
        loadMoreFn()
      }
    }

    // the first argument for 'listener' is required to be 'scroll' for the event listener to work.
    topDiv?.addEventListener('scroll', autoLoad)

    return () => {
      topDiv?.removeEventListener('scroll', autoLoad)
    }
  }, [chatRef, loadMoreFn, shouldLoadMore])

  // automatically scrolls chat page to the bottom when new messages are added.
  useEffect(() => {
    const topDiv = chatRef.current
    const bottomDiv = bottomRef?.current

    function shouldAutoScroll(): boolean {
      if (!topDiv) return false

      // ensures that the chat-message component is initially scrolled to the bottom when it mounts.
      if (bottomDiv && !hasInitialized) {
        setHasInitialized(true)
        return true
      }

      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight

      return distanceFromBottom <= 100
    }

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomDiv?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [bottomRef, chatRef, count, hasInitialized])
}
