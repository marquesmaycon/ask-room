"use client"

import { useParams } from "next/navigation"

import { useRoom } from "@/features/room/hooks/use-room"

export default function RoomPage() {
  const { id } = useParams<{ id: string }>()

  const { data } = useRoom({ param: { id } })

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
