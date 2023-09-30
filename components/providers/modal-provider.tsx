'use client'

import { useEffect, useState } from 'react'

import { CreateChannelModal } from '@/components/modals/create-channel-modal'
import { CreateServerModal } from '@/components/modals/create-server-modal'
import { DeleteServerModal } from '@/components/modals/delete-server-modal'
import { EditServerModal } from '@/components/modals/edit-server-modal'
import { InviteModal } from '@/components/modals/invite-modal'
import { MembersModal } from '@/components/modals/members-modal'

import { LeaveServerModal } from '../modals/LeaveServerModal'

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
      <EditServerModal />
      <LeaveServerModal />
      <InviteModal />
      <MembersModal />
      <CreateChannelModal />
      <DeleteServerModal />
    </>
  )
}
