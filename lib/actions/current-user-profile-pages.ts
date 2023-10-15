import { NextApiRequest } from 'next'
import { getAuth } from '@clerk/nextjs/server'

import { db } from '@/lib/db'

export async function currentUserProfilePages(req: NextApiRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return null
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  })
  return profile
}
