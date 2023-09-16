interface ServerPageProps {
  params: { serverId: string }
}

export default async function ServerPage({ params }: ServerPageProps) {
  return <div>server page </div>
}
