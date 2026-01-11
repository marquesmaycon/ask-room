import { useMutation } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomQueryOptions } from "./use-room"

const createRoomChunkRequest = client.api.rooms[":id"].chunks.$post

type RequestType = InferRequestType<typeof createRoomChunkRequest>

export const useCreateRoomChunk = () => {
  return useMutation({
    mutationFn: async ({ param, json }: RequestType) => {
      const res = await createRoomChunkRequest({ param, json })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }

      const { chunk } = await res.json()
      return chunk
    },
    onSuccess: (_, { param: { id } }, __, { client }) => {
      toast.success("Texto enviado com sucesso.")
      client.invalidateQueries(roomQueryOptions({ param: { id } }))
    },
    onError: (err) => {
      toast.error("Ocorreu um erro ao enviar o texto.", { description: err.message })
    }
  })
}
