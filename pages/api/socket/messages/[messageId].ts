import { NextApiRequest } from 'next'
import { NextApiResponseServerIo } from '@/type'

import { currentUserProfilePages } from '@/lib/actions/current-user-profile-pages'
import { db } from '@/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== 'PATCH' && req.method !== 'DELETE')
    return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { content } = req.body
    const { messageId, channelId, serverId } = req.query

    const profile = await currentUserProfilePages(req)
    if (!profile) return res.status(401).json({ error: 'Unauthorized' })

    if (!messageId) return res.status(400).json({ error: 'Missing messageId' })

    if (!channelId) return res.status(400).json({ error: 'Missing channelId' })

    if (!serverId) return res.status(400).json({ error: 'Missing serverId' })

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    })

    if (!server) return res.status(404).json({ error: 'Server not found' })

    const currentUserMember = server.members.find(
      (member) => member.profileId === profile.id
    )

    if (!currentUserMember)
      return res.status(404).json({ error: 'Member not found' })

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channelId as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    })

    if (!message || message.isDeleted) {
      return res.status(404).json({ error: 'Message not found' })
    }

    const isMessageOwner = message.memberId === currentUserMember.id
    const isAdmin = currentUserMember.role === 'ADMIN'
    const isModerator = currentUserMember.role === 'MODERATOR'
    const canModify = isMessageOwner || isAdmin || isModerator

    if (!canModify) {
      return res
        .status(401)
        .json({ error: 'Unauthorized to edit or delete message' })
    }

    if (req.method === 'PATCH') {
      if (!isMessageOwner) {
        return res.status(401).json({ error: 'Unauthorized to edit message' })
      }

      message = await db.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      })
    }

    if (req.method === 'DELETE') {
      message = await db.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          content: 'this message has been deleted',
          isDeleted: true,
          fileUrl: null,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      })
    }

    const updateKey = `chat:${channelId}:messages:update`

    res?.socket?.server?.io?.emit(updateKey, message)

    return res.status(200).json(message)
  } catch (error) {
    console.log('MESSAGE_ID', error)
    return res.status(500).json({ error: 'Internal Error' })
  }
}
