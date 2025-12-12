import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomsQueryOptions } from "./use-rooms"

const createRoomQuestionRequest = client.api.rooms[":id"].questions.$post

type RequestType = InferRequestType<typeof createRoomQuestionRequest>

export const useCreateRoomQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ param, json }: RequestType) => {
      const res = await createRoomQuestionRequest({ param, json })

      if (!res.ok) {
        throw new Error("Failed to create question")
      }

      const { question } = await res.json()
      return question
    },
    onSuccess: () => {
      toast.success("Pergunta criada com sucesso.")
      queryClient.invalidateQueries(roomsQueryOptions)
    },
    onError: () => {
      toast.error("Ocorreu um erro ao criar a pergunta.")
    }
  })
}
