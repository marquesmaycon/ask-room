import { queryOptions, useQuery } from "@tanstack/react-query"
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"

import { client } from "@/lib/rpc"

export const myRoomsQueryOptions = (headers?: ReadonlyHeaders) =>
  queryOptions({
    queryKey: ["my-rooms"],
    queryFn: async () => {
      const res = await client.api.rooms["my-rooms"].$get(
        {},
        {
          headers: Object.fromEntries(headers?.entries() ?? [])
        }
      )
      const { rooms } = await res.json()
      return rooms || []
    }
  })

export const useMyRooms = (headers?: ReadonlyHeaders) => useQuery(myRoomsQueryOptions(headers))
