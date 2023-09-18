import { NavigationAction } from './navigation-action'

export function NavigationSidebar() {
  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 overflow-auto bg-gray-300 px-1 py-3 dark:bg-gray-900">
      <NavigationAction />
    </div>
  )
}
