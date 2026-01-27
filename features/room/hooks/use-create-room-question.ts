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
    onMutate: ({ param, json }, { client }) => {
      const previousData = client.getQueryData(roomQueryOptions({ param }).queryKey)

      client.setQueryData(roomQueryOptions({ param }).queryKey, (old) => {
        if (!old?.questions) return old
        return {
          ...old,
          questions: [createQuestionMock(json.question, param.id), ...old.questions]
        }
      })

      return { previousData }
    },
    onSuccess: () => {
      toast.success("Pergunta criada com sucesso.")
    },
    onError: (err, { param }, res, { client }) => {
      client.setQueryData(roomQueryOptions({ param }).queryKey, res?.previousData)
      toast.error(`Ocorreu um erro ao criar a pergunta`, { description: err.message })
    },
    onSettled: (_, __, { param }, ___, { client }) => {
      client.invalidateQueries(roomQueryOptions({ param }))
    }
  })
}

const createQuestionMock = (question: string, roomId: string) => ({
  id: "temp-id-" + Math.random().toString(36),
  question,
  answer: "IA respondendo...",
  pinned: false,
  roomId,
  userId: null,
  user: { name: "Você", avatarUrl: null },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})
