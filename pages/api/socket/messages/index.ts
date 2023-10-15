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

    if (!content) return res.status(400).json({ error: 'Missing content' })

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

    const member = server.members.find(
      (member) => member.profileId === profile.id
    )

    if (!member) return res.status(404).json({ error: 'Member not found' })

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        memberId: member.id,
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

    const channelKey = `chat:${channelId}:messages`

    res?.socket?.server?.io?.emit(channelKey, message)

    return res.status(200).json(message)
  } catch (error) {
    console.log('MESSAGES_POST', error)
    return res.status(500).json({ error: 'Internal Error' })
  }
}
