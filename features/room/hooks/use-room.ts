import { queryOptions, useQuery } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

const getRoomRequest = client.api.rooms[":id"].$get

type GetRoomRoute = typeof getRoomRequest
type RequestType = InferRequestType<GetRoomRoute>
export type ResponseType = InferResponseType<GetRoomRoute>

export const roomQueryOptions = ({ param }: RequestType) =>
  queryOptions({
    queryKey: ["rooms", param.id],
    queryFn: async () => {
      const res = await getRoomRequest({ param })

      const { room } = await res.json()
      return room
    }
  })

export const useRoom = ({ param }: RequestType) => {
  return useQuery(roomQueryOptions({ param }))
}
