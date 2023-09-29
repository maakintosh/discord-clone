import { NextResponse } from 'next/server'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const { name, imageUrl } = await req.json()

    const profile = await currentUserProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.serverId) {
      return new NextResponse('Server id is missing ', { status: 400 })
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log('SERVER_ID_PATCH', error)
    return new NextResponse('Intenal Error', { status: 500 })
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentUserProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.serverId) {
      return new NextResponse('Server id is missing ', { status: 400 })
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log('SERVER_ID_DELETE', error)
    return new NextResponse('Intenal Error', { status: 500 })
  }
}
