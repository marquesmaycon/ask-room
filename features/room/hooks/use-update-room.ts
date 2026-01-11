import { useMutation } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomDetailsQueryOptions } from "./use-room-details"
import { roomsQueryOptions } from "./use-rooms"

const updateRoomRequest = client.api.rooms[":id"].$put

type RequestType = InferRequestType<typeof updateRoomRequest>

export const useUpdateRoom = () => {
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
    onSuccess: (room, __, ___, { client }) => {
      toast.success("Sala atualizada com sucesso!")
      client.invalidateQueries(roomsQueryOptions)
      client.invalidateQueries(roomDetailsQueryOptions({ param: { id: room.id } }))
    },
    onError: (error: Error) => {
      toast.error("Ocorreu um erro ao atualizar a sala", { description: error.message })
    }
  })
}
