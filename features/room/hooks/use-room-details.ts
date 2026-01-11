import { queryOptions, useQuery } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"

import { client } from "@/lib/rpc"

const getRoomDetailsRequest = client.api.rooms[":id"].details.$get

type RequestType = InferRequestType<typeof getRoomDetailsRequest>

type RoomDetailsArgs = RequestType & {
  headers?: ReadonlyHeaders
}

export const roomDetailsQueryOptions = ({ param, headers }: RoomDetailsArgs) =>
  queryOptions({
    queryKey: ["rooms", param.id, "details"],
    queryFn: async () => {
      const res = await getRoomDetailsRequest(
        { param },
        { headers: Object.fromEntries(headers?.entries() ?? []) }
      )

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }

      const { room } = await res.json()
      return room
    },
    enabled: !!param.id
  })

export const useRoomDetails = (args: RoomDetailsArgs) => {
  return useQuery(roomDetailsQueryOptions(args))
}
