import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomQueryOptions } from "./use-room"

const updateRoomChunkRequest = client.api.rooms.chunks[":id"].$put

type RequestType = InferRequestType<typeof updateRoomChunkRequest>

export const useUpdateRoomChunk = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ param, json }: RequestType) => {
      const res = await updateRoomChunkRequest({ param, json })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }

      const { chunk } = await res.json()
      return chunk
    },
    onSuccess: (_, { param: { id } }) => {
      toast.success("Texto atualizado com sucesso.")
      queryClient.invalidateQueries(roomQueryOptions({ param: { id } }))
    },
    onError: (err) => {
      toast.error("Ocorreu um erro ao atualizar o texto.", { description: err.message })
    }
  })
}
