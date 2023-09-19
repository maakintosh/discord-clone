import { ServerSidebar } from '@/components/server/server-sidebar'

export default function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { serverId: string }
}) {
  return (
    <div className="min-h-screen">
      <section className="fixed inset-y-0 z-20 flex h-full w-60 flex-col max-md:hidden">
        <ServerSidebar serverId={params.serverId} />
      </section>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  )
}
