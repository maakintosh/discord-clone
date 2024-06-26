import { NextApiRequest } from 'next'
import { NextApiResponseServerIo } from '@/type'

import { currentUserProfilePages } from '@/lib/actions/current-user-profile-pages'
import { db } from '@/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { content, fileUrl } = req.body
    const { channelId, serverId } = req.query

    const profile = await currentUserProfilePages(req)
    if (!profile) return res.status(401).json({ error: 'Unauthorized' })

    if (!channelId) return res.status(400).json({ error: 'Missing channelId' })

    if (!serverId) return res.status(400).json({ error: 'Missing serverId' })

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      include: {
        members: true
      }
    })

    if (!server) return res.status(404).json({ error: 'Server not found' })

    const currentUserMember = server.members.find(
      (member) => member.profileId === profile.id
    )

    if (!currentUserMember)
      return res.status(404).json({ error: 'Member not found' })

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        memberId: currentUserMember.id,
        channelId: channelId as string
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    // this 'channelKey' should be identical string to the one passed into use-chat-socket (addKey in this case).
    const channelKey = `chat:${channelId}:messages`

    // the Socket.IO library, which enables real-time, bidirectional, and event-based communication between the browser and the server .The emit function is used to send messages from the server to the client.
    res?.socket?.server?.io?.emit(channelKey, message)

    return res.status(200).json(message)
  } catch (error) {
    console.log('MESSAGES_POST', error)
    return res.status(500).json({ error: 'Internal Error' })
  }
}
