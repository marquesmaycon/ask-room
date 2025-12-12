import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomsQueryOptions } from "./use-rooms"

const createRoomAudioRequest = client.api.rooms[":id"].audio.$post

type RequestType = InferRequestType<typeof createRoomAudioRequest>

export const useUploadRoomAudio = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ param, form }: RequestType) => {
      const res = await createRoomAudioRequest({ param, form })

      if (!res.ok) {
        throw new Error("Failed to upload audio")
      }

      return await res.json()
    },
    onSuccess: () => {
      toast.success("Áudio enviado com sucesso.")
      queryClient.invalidateQueries(roomsQueryOptions)
    },
    onError: () => {
      toast.error("Ocorreu um erro ao enviar o áudio.")
    }
  })
}
