import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { NextApiResponseServerIo } from '@/type'
import { Server as ServerIo } from 'socket.io'

export const config = {
  api: {
    bodyParser: false
  }
}

export default function ioHandler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (!res.socket.server.io) {
    const path = '/api/socket/io'
    const httpServer: NetServer = res.socket.server as any

    const io = new ServerIo(httpServer, {
      path
    })
    res.socket.server.io = io
  }
  res.end()
}
