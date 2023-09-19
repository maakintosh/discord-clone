'use client'

import { useEffect, useState } from 'react'

import { CreateServerModal } from '../modals/create-server-modal'

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  // prevents modals to be rendered on the server from causing hydration errors
  if (!isMounted) return null

  return (
    <>
      <CreateServerModal />
    </>
  )
}
