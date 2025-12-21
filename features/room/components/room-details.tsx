"use client"

import { useParams } from "next/navigation"

import { useRoomDetails } from "../hooks/use-room-details"
import { FeedRoomContext } from "./feed-room-context"
import { RecordRoomAudio } from "./record-room-audio"

export function RoomDetails() {
  const { id } = useParams<{ id: string }>()
  const { data: room } = useRoomDetails({ param: { id } })
  return (
    <div className="space-y-4 rounded-md bg-slate-500 p-4">
      <h3>Room Details</h3>
      <FeedRoomContext />
      <RecordRoomAudio />
      <div>
        <pre>
          {JSON.stringify(
            room?.roomChunks.map((c) => c.transcription),
            null,
            2
          )}
        </pre>
        <pre>
          {JSON.stringify(
            room?.questions.map((c) => c.question),
            null,
            2
          )}
        </pre>
      </div>
    </div>
  )
}
