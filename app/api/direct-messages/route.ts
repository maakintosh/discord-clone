import { NextResponse } from 'next/server'
import { DirectMessage } from '@prisma/client'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'

const DIRECT_MESSAGES_BATCH_SIZE = 20

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get('conversationId')
    const cursor = searchParams.get('cursor')

    const profile = await currentUserProfile()
    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!conversationId) {
      return new NextResponse('Conversation ID is missing', { status: 400 })
    }

    let directMessages: DirectMessage[] = []

    directMessages = await db.directMessage.findMany({
      take: DIRECT_MESSAGES_BATCH_SIZE,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        conversationId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    let nextCursor = null

    if (directMessages.length === DIRECT_MESSAGES_BATCH_SIZE) {
      nextCursor = directMessages[DIRECT_MESSAGES_BATCH_SIZE - 1].id
    }

    return NextResponse.json({
      items: directMessages,
      nextCursor,
    })
  } catch (error) {
    console.log('[DIRECT_MESSAGES_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
