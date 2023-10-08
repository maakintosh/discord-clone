import { NextResponse } from 'next/server'
import { MemberRole } from '@prisma/client'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    const profile = await currentUserProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.channelId) {
      return new NextResponse('Member ID is missing', { status: 400 })
    }

    if (!serverId) {
      return new NextResponse('Server ID is missing', { status: 400 })
    }

    const channel = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
          },
        },
      },
    })

    return NextResponse.json(channel)
  } catch (error) {
    console.log('CHANNEL_ID_DELETE', error)
    return new NextResponse('Intenal Error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')
    const { type, name } = await req.json()

    const profile = await currentUserProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.channelId) {
      return new NextResponse('Member ID is missing', { status: 400 })
    }

    if (!serverId) {
      return new NextResponse('Server ID is missing', { status: 400 })
    }

    if (name === 'general') {
      return new NextResponse('Channel name cannot be "general"', {
        status: 400,
      })
    }

    const channel = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
              NOT: {
                name: 'general',
              },
            },
            data: {
              type,
              name,
            },
          },
        },
      },
    })

    return NextResponse.json(channel)
  } catch (error) {
    console.log('CHANNEL_ID_PATCH', error)
    return new NextResponse('Intenal Error', { status: 500 })
  }
}
