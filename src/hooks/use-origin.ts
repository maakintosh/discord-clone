import { useEffect, useState } from 'react'

export function useOrigin() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return ''

  const origin = window.location.origin ? window.location.origin : ''

  return origin
}
