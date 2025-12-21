import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomQueryOptions } from "./use-room"

const uploadRoomAudioRequest = client.api.rooms[":id"].audio.$post

type RequestType = InferRequestType<typeof uploadRoomAudioRequest>

export const useUploadRoomAudio = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ param, form }: RequestType) => {
      const res = await uploadRoomAudioRequest({ param, form })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }

      const { chunk } = await res.json()
      return chunk
    },
    onSuccess: (_, { param: { id } }) => {
      toast.success("Áudio enviado com sucesso.")
      queryClient.invalidateQueries(roomQueryOptions({ param: { id } }))
    },
    onError: (err) => {
      toast.error("Ocorreu um erro ao enviar o áudio.", { description: err.message })
    }
  })
}
