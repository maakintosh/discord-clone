'use client'

import { useEffect, useState } from 'react'

import { CreateChannelModal } from '@/components/modals/create-channel-modal'
import { CreateServerModal } from '@/components/modals/create-server-modal'
import { DeleteChannelModal } from '@/components/modals/delete-channel-modal'
import { DeleteServerModal } from '@/components/modals/delete-server-modal'
import { EditChannelModal } from '@/components/modals/edit-channel-modal'
import { EditServerModal } from '@/components/modals/edit-server-modal'
import { InviteModal } from '@/components/modals/invite-modal'
import { LeaveServerModal } from '@/components/modals/leave-server-modal'
import { MembersModal } from '@/components/modals/members-modal'
import { MessageFileModal } from '@/components/modals/message-file-modal'

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
      <EditChannelModal />
      <DeleteChannelModal />
      <DeleteServerModal />
      <MessageFileModal />
    </>
  )
}
