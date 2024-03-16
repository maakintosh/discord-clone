import { NextResponse } from 'next/server'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'

export async function PATCH(
  // Request must be passed as an argument to avoid a build error
  _req: Request,
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
        // the creater of the server cannot leave the server
        profileId: {
          not: profile.id
        },
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id
          }
        }
      }
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log('SERVER_ID_LEAVE_PATCH', error)
    return new NextResponse('Intenal Error', { status: 500 })
  }
}
