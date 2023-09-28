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
