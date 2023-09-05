import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center ">
      <div className="flex gap-x-1 ">
        <UserButton afterSignOutUrl="/" />
        <p className="text-lg text-indigo-400">Hello, discord-clone</p>
      </div>
    </section>
  )
}
