import { UserButton } from '@clerk/nextjs'

import { ModeToggle } from '@/components/mode-toggle'

export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center justify-center ">
        <div className="flex gap-x-1 ">
          <UserButton afterSignOutUrl="/" />
          <p className="text-lg text-indigo-400">Hello, discord-clone</p>
        </div>
        <ModeToggle />
      </section>
    </div>
  )
}
