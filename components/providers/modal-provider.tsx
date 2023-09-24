'use client'

import { useEffect, useState } from 'react'

import { CreateServerModal } from '@/components/modals/create-server-modal'
import { EditServerModal } from '@/components/modals/edit-server-modal'
import { InviteModal } from '@/components/modals/invite-modal'
import { MembersModal } from '@/components/modals/members-modal'

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
      <InviteModal />
      <EditServerModal />
      <MembersModal />
    </>
  )
}
