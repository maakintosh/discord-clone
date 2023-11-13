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
    const { directMessageId, conversationId } = req.query

    const profile = await currentUserProfilePages(req)
    if (!profile) return res.status(401).json({ error: 'Unauthorized' })

    if (!directMessageId)
      return res.status(400).json({ error: 'Missing directMessageId' })

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

    if (!currentUserMember)
      return res.status(404).json({ error: 'Member not found' })

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
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

    if (!directMessage || directMessage.isDeleted) {
      return res.status(404).json({ error: 'Direct message not found' })
    }

    const isMessageOwner = directMessage.memberId === currentUserMember.id
    const canModify = isMessageOwner

    if (!canModify) {
      return res
        .status(401)
        .json({ error: 'Unauthorized to edit or delete message' })
    }

    if (req.method === 'PATCH') {
      if (!isMessageOwner) {
        return res.status(401).json({ error: 'Unauthorized to edit message' })
      }

      directMessage = await db.directMessage.update({
        where: {
          id: directMessageId as string,
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
      directMessage = await db.directMessage.update({
        where: {
          id: directMessageId as string,
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

    const updateKey = `chat:${conversationId}:messages:update`

    res?.socket?.server?.io?.emit(updateKey, directMessage)

    return res.status(200).json(directMessage)
  } catch (error) {
    console.log('MESSAGE_ID', error)
    return res.status(500).json({ error: 'Internal Error' })
  }
}
