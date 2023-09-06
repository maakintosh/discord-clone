import { redirect } from 'next/navigation'

import { fetchOrCreateProfile } from '@/lib/actions/fetch-or-create-profile'
import { db } from '@/lib/db'

export default async function RootPage() {
  const profile = await fetchOrCreateProfile()

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (server) {
    redirect(`/servers/${server.id}`)
  }

  return <div>root page</div>
}
