import { NextResponse } from 'next/server'
import { MemberRole } from '@prisma/client'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { name, type } = await req.json()
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    const profile = await currentUserProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!serverId) {
      return new NextResponse('Server ID is missing', { status: 400 })
    }

    if (name === 'general') {
      return new NextResponse("Name cannot be 'general'", { status: 400 })
    }

    const channel = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type
          }
        }
      }
    })

    return NextResponse.json(channel)
  } catch (error) {
    console.log('CHANNELS_POST', error)
    return new NextResponse('Intenal Error', { status: 500 })
  }
}
