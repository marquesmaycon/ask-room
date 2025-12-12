import { queryOptions, useQuery } from "@tanstack/react-query"

import { client } from "@/lib/rpc"

export const roomsQueryOptions = queryOptions({
  queryKey: ["rooms"],
  queryFn: async () => {
    const response = await client.api.rooms.$get()
    const { rooms } = await response.json()
    return rooms
  }
})

export const useRooms = () => {
  return useQuery(roomsQueryOptions)
}
