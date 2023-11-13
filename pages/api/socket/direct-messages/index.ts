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
    const { conversationId } = req.query

    const profile = await currentUserProfilePages(req)
    if (!profile) return res.status(401).json({ error: 'Unauthorized' })

    if (!conversationId)
      return res.status(400).json({ error: 'Missing conversationId' })

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            member1: {
              profileId: profile.id,
            },
          },
          {
            member2: {
              profileId: profile.id,
            },
          },
        ],
      },
      include: {
        member1: {
          include: {
            profile: true,
          },
        },
        member2: {
          include: {
            profile: true,
          },
        },
      },
    })

    if (!conversation)
      return res.status(404).json({ error: 'Conversation not found' })

    const currentUserMember =
      conversation.member1.profileId === profile.id
        ? conversation.member1
        : conversation.member2

    const directMessage = await db.directMessage.create({
      data: {
        content,
        fileUrl,
        memberId: currentUserMember.id,
        conversationId: conversationId as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    })

    const channelKey = `chat:${conversationId}:messages`

    // the Socket.IO library enables real-time, bidirectional, and event-based communication between the browser and the server .The emit function is used to send messages from the server to the client.
    res?.socket?.server?.io?.emit(channelKey, directMessage)

    return res.status(200).json(directMessage)
  } catch (error) {
    console.log('DIRECT_MESSAGES_POST', error)
    return res.status(500).json({ error: 'Internal Error' })
  }
}
