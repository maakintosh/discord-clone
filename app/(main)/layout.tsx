import { NavigationSidebar } from '@/components/navigations/navigation-sidebar'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <section className="fixed inset-y-0 left-0 z-30 w-14 overflow-auto bg-gray-900 max-md:hidden">
        <NavigationSidebar />
      </section>
      <main className="md:pl-14">{children}</main>
    </div>
  )
}
