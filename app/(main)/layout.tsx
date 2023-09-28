import { NavigationSidebar } from '@/components/navigations/navigation-sidebar'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <section className="fixed inset-y-0 z-30 flex h-full w-[72px] max-md:hidden">
        <NavigationSidebar />
      </section>
      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  )
}
