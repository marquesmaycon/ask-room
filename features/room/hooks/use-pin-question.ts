import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomQueryOptions } from "./use-room"

const pinQuestionRequest = client.api.rooms.questions[":id"].pin.$patch

type RequestType = InferRequestType<typeof pinQuestionRequest>
type PinQuestionArgs = RequestType & {
  roomId: string
}

export const usePinQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ param }: PinQuestionArgs) => {
      const res = await pinQuestionRequest({ param })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }

      return res.json()
    },
    onSuccess: ({ question }, { roomId }) => {
      toast.success(`Pergunta ${question.pinned ? "fixada" : "desfixada"} com sucesso.`)
      queryClient.invalidateQueries(roomQueryOptions({ param: { id: roomId } }))
    },
    onError: (err) => {
      toast.error("Ocorreu um erro ao fixar a pergunta.", { description: err.message })
    }
  })
}
