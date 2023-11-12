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
    const { currentUserMemberId, opponentMemberId, conversationId } = req.query

    const profile = await currentUserProfilePages(req)
    if (!profile) return res.status(401).json({ error: 'Unauthorized' })

    if (!opponentMemberId)
      return res.status(400).json({ error: 'Missing opponentMemberId' })

    if (!conversationId)
      return res.status(400).json({ error: 'Missing conversationId' })

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            member1Id: currentUserMemberId as string,
            member2Id: opponentMemberId as string,
          },
          {
            member1Id: opponentMemberId as string,
            member2Id: currentUserMemberId as string,
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

    const conversationKey = `chat:${conversationId}:direct-messages`

    res?.socket?.server?.io?.emit(conversationKey, directMessage)

    return res.status(200).json(directMessage)
  } catch (error) {
    console.log('DIRECT_MESSAGES_POST', error)
    return res.status(500).json({ error: 'Internal Error' })
  }
}
