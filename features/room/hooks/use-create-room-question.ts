import { useMutation } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomQueryOptions } from "./use-room"

const createRoomQuestionRequest = client.api.rooms[":id"].questions.$post

type RequestType = InferRequestType<typeof createRoomQuestionRequest>

export const useCreateRoomQuestion = () => {
  return useMutation({
    mutationFn: async ({ param, json }: RequestType) => {
      const res = await createRoomQuestionRequest({ param, json })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }

      const { question } = await res.json()
      return question
    },
    onSuccess: (_, { param: { id } }, __, { client }) => {
      toast.success("Pergunta criada com sucesso.")
      client.invalidateQueries(roomQueryOptions({ param: { id } }))
    },
    onError: (err) => {
      toast.error(`Ocorreu um erro ao criar a pergunta`, { description: err.message })
    }
  })
}
