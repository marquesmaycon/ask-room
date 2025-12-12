import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomsQueryOptions } from "./use-rooms"

const feedRoomRequest = client.api.rooms[":id"].text.$post

type RequestType = InferRequestType<typeof feedRoomRequest>

export const useFeedRoom = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ param, json }: RequestType) => {
      const res = await feedRoomRequest({ param, json })

      if (!res.ok) {
        throw new Error("Error feeding room with text")
      }

      return await res.json()
    },
    onSuccess: () => {
      toast.success("Texto enviado com sucesso.")
      queryClient.invalidateQueries(roomsQueryOptions)
    },
    onError: () => {
      toast.error("Ocorreu um erro ao enviar o texto.")
    }
  })
}
