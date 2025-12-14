"use client"

import { useMyRooms } from "../hooks/use-my-rooms"

export function MyRooms() {
  const { data, isLoading } = useMyRooms()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
