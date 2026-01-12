import { useMutation } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomDetailsQueryOptions } from "../../room/hooks/use-room-details"

const updateChunkRequest = client.api.chunks[":id"].$put

type RequestType = InferRequestType<typeof updateChunkRequest>

export const useUpdateChunk = () => {
  return useMutation({
    mutationFn: async ({ param, json }: RequestType) => {
      const res = await updateChunkRequest({ param, json })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }

      const { chunk } = await res.json()
      return chunk
    },
    onSuccess: ({ roomId }, _, __, { client }) => {
      toast.success("Texto atualizado com sucesso.")
      client.invalidateQueries(roomDetailsQueryOptions({ param: { id: roomId } }))
    },
    onError: (err) => {
      toast.error("Ocorreu um erro ao atualizar o texto.", { description: err.message })
    }
  })
}
