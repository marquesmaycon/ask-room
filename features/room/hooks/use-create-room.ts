import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomsQueryOptions } from "./use-rooms"

const createRoomRequest = client.api.rooms.$post

type RequestType = InferRequestType<typeof createRoomRequest>

export const useCreateRoom = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ json }: RequestType) => {
      const res = await createRoomRequest({ json })
      const { room } = await res.json()
      return room
    },
    onSuccess: () => {
      toast.success("Room created successfully")
      queryClient.invalidateQueries(roomsQueryOptions)
    },
    onError: () => {
      toast.error("An error occurred while creating the room.")
    }
  })
}
