import { useMutation } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomDetailsQueryOptions } from "./use-room-details"

const uploadRoomAudioRequest = client.api.rooms[":id"].audio.$post

type RequestType = InferRequestType<typeof uploadRoomAudioRequest>

export const useUploadRoomAudio = () => {
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
    onSuccess: () => {
      toast.success("Áudio enviado com sucesso.")
    },
    onError: (err) => {
      toast.error("Ocorreu um erro ao enviar o áudio.", { description: err.message })
    },
    onSettled: (_, __, { param: { id } }, ___, { client }) => {
      client.invalidateQueries(roomDetailsQueryOptions({ param: { id } }))
    }
  })
}
