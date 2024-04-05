'use client'

import '@livekit/components-styles'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import { Loader2 } from 'lucide-react'

interface MediaRoomProps {
  chatId: string
  isVideo: boolean
  isAudio: boolean
}

export function MediaRoom({ chatId, isVideo, isAudio }: MediaRoomProps) {
  const { user } = useUser()
  const [token, setToken] = useState('')

  useEffect(() => {
    if (typeof user?.firstName == undefined || user?.lastName == undefined)
      return

    const name = `${user.firstName ?? user.username} ${user.lastName ?? ''}`

    ;(async () => {
      try {
        const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await res.json()
        setToken(data.token)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [chatId, user?.firstName, user?.lastName, user?.username])

  if (token === '') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center ">
        <Loader2 className="my-4 size-8 animate-spin text-zinc-500" />
        <p className="text-zinc-500">Loading...</p>
      </div>
    )
  }

  return (
    <LiveKitRoom
      video={isVideo}
      audio={isAudio}
      token={token}
      connect={true}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
      <VideoConference />
    </LiveKitRoom>
  )
}
