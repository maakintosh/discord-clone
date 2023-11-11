import { redirect } from 'next/navigation'
import { redirectToSignIn } from '@clerk/nextjs'

import { currentUserProfile } from '@/lib/actions/current-user-profile'
import { db } from '@/lib/db'
import { ServerSidebar } from '@/components/server/server-sidebar'

export default async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { serverId: string }
}) {
  const profile = await currentUserProfile()
  if (!profile) redirectToSignIn()

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  })

  if (!server) redirect('/')

  return (
    <div className="h-full">
      <section className="fixed inset-y-0 z-20 flex h-full w-60 flex-col max-md:hidden">
        <ServerSidebar serverId={params.serverId} />
      </section>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  )
}
