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
  const name = `${user?.firstName} ${user?.lastName}`
  const [token, setToken] = useState('')

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return
    ;(async () => {
      try {
        const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await res.json()
        setToken(data.token)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [chatId, name, user?.firstName, user?.lastName])

  if (!token) {
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
      style={{ height: '100dvh' }}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}
