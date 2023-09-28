import { Member, Server } from '@prisma/client'
import { create } from 'zustand'

export type ModalType =
  | 'create-server'
  | 'invite'
  | 'edit-server'
  | 'members'
  | 'create-channel'

interface ModalData {
  server?: Server
}

interface ModalStore {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}))
