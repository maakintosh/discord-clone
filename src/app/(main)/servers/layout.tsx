import { NavigationSidebar } from '@/components/navigations/navigation-sidebar'

export default async function ServersLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full max-w-screen-lg">
      <section className="fixed inset-y-0 z-30 flex h-full w-[72px] max-md:hidden">
        <NavigationSidebar />
      </section>
      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  )
}
