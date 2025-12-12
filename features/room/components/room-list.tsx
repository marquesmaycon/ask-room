"use client"

import { useRooms } from "../hooks/use-rooms"

export const RoomList = () => {
  const { data, isLoading } = useRooms()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <pre>{JSON.stringify({ data, isLoading }, null, 2)}</pre>
}
