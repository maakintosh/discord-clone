interface ServerSidebarProps {
  serverId: string
}

export function ServerSidebar({ serverId }: ServerSidebarProps) {
  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 overflow-auto bg-gray-300 py-4 dark:bg-gray-700">
      server sidebar
    </div>
  )
}
