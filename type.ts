import { Server as NetServer, Socket } from 'net'
import { NextApiResponse } from 'next'
import { Member, Profile, Server } from '@prisma/client'
import { Server as SocketServer } from 'socket.io'

export type ServerWithMembersWithProfile = Server & {
  members: (Member & { profile: Profile })[]
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketServer
    }
  }
}
