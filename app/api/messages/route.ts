import { NextResponse } from 'next/server'
import { Message } from '@prisma/client'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'

const MESSAGES_BATCH_SIZE = 20

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const channelId = searchParams.get('channelId')
    const cursor = searchParams.get('cursor')

    const profile = await currentUserProfile()
    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!channelId) {
      return new NextResponse('Channel ID is missing', { status: 400 })
    }

    let messages: Message[] = []

    messages = await db.message.findMany({
      take: MESSAGES_BATCH_SIZE,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        channelId
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    let nextCursor = null

    if (messages.length === MESSAGES_BATCH_SIZE) {
      nextCursor = messages[MESSAGES_BATCH_SIZE - 1].id
    }

    return NextResponse.json({
      items: messages,
      nextCursor
    })
  } catch (error) {
    console.log('[MESSAGES_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
