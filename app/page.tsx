import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <Button variant={'secondary'}>Click Me</Button>
      <p className="text-lg text-indigo-400">Hello, discord-clone</p>
    </div>
  )
}
