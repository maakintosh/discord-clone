import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'

export async function PATCH(
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

    const server = await db.server.update({
      where: {
        id: params.serverId,
        // validates if your are the owner of the server
        profileId: profile.id
      },
      data: {
        inviteCode: uuidv4()
      }
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVER_ID]_PATCH', error)
    return new NextResponse('Intenal Error', { status: 500 })
  }
}
