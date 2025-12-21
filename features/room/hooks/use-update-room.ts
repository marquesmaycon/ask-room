import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomsQueryOptions } from "./use-rooms"

const updateRoomRequest = client.api.rooms[":id"].$put

type RequestType = InferRequestType<typeof updateRoomRequest>

export const useUpdateRoom = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ json, param }: RequestType) => {
      const res = await updateRoomRequest({ json, param })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }

      const { room } = await res.json()
      return room
    },
    onSuccess: () => {
      toast.success("Room updated successfully")
      queryClient.invalidateQueries(roomsQueryOptions)
    },
    onError: (error: Error) => {
      toast.error(`An error occurred while updating the room: ${error.message}`)
    }
  })
}
