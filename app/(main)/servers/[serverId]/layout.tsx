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
      <section className="fixed inset-y-0 z-20 flex w-60 overflow-auto bg-gray-700 max-md:hidden">
        <ServerSidebar serverId={params.serverId} />
      </section>
      <main className="md:pl-60">{children}</main>
    </div>
  )
}
