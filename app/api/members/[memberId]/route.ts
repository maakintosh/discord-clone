import { NextResponse } from 'next/server'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const { role } = await req.json()
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    const profile = await currentUserProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.memberId) {
      return new NextResponse('Member ID is missing', { status: 400 })
    }

    if (!serverId) {
      return new NextResponse('Server ID is missing', { status: 400 })
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              // prevents ADMIN from updating himself
              profileId: { not: profile.id },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log('MEMBER_ID_PATCH', error)
    return new NextResponse('Intenal Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    const profile = await currentUserProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.memberId) {
      return new NextResponse('Member ID is missing', { status: 400 })
    }

    if (!serverId) {
      return new NextResponse('Server ID is missing', { status: 400 })
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            // prevents ADMIN from deleteing himself
            profileId: { not: profile.id },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log('MEMBER_ID_DELETE', error)
    return new NextResponse('Intenal Error', { status: 500 })
  }
}
