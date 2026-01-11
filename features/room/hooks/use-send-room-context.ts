import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomQueryOptions } from "./use-room"

const sendRoomContextRequest = client.api.rooms[":id"].context.$post

type RequestType = InferRequestType<typeof sendRoomContextRequest>

export const useSendRoomContext = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ param, json }: RequestType) => {
      const res = await sendRoomContextRequest({ param, json })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }

      const { chunk } = await res.json()
      return chunk
    },
    onSuccess: (_, { param: { id } }) => {
      toast.success("Texto enviado com sucesso.")
      queryClient.invalidateQueries(roomQueryOptions({ param: { id } }))
    },
    onError: (err) => {
      toast.error("Ocorreu um erro ao enviar o texto.", { description: err.message })
    }
  })
}
