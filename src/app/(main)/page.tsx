import Link from 'next/link'

export default async function RootLandingPage() {
  return (
    <div>
      <p>Landing Page</p>
      <Link href={'/servers'}>Get Started!</Link>
    </div>
  )
}
