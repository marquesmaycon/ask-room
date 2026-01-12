import { useMutation } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomQueryOptions } from "../../room/hooks/use-room"

const deleteQuestionRequest = client.api.questions[":id"].$delete

type DeleteQuestionArgs = InferRequestType<typeof deleteQuestionRequest> & {
  roomId: string
}

export const useDeleteQuestion = () => {
  return useMutation({
    mutationFn: async ({ param }: DeleteQuestionArgs) => {
      const res = await deleteQuestionRequest({ param })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }
    },
    onMutate: ({ roomId, param }, { client }) => {
      const previousData = client.getQueryData(roomQueryOptions({ param: { id: roomId } }).queryKey)

      client.setQueryData(roomQueryOptions({ param: { id: roomId } }).queryKey, (old) => {
        if (!old?.questions) return old
        return {
          ...old,
          questions: old.questions.filter((q) => q.id !== param.id)
        }
      })

      return { previousData, roomId }
    },
    onSuccess: () => {
      toast.success("Pergunta deletada com sucesso.")
    },
    onError: (err, { roomId }, res, { client }) => {
      client.setQueryData(roomQueryOptions({ param: { id: roomId } }).queryKey, res?.previousData)
      toast.error("Ocorreu um erro ao deletar a pergunta.", { description: err.message })
    },
    onSettled: (_, __, { roomId }, ___, { client }) => {
      client.invalidateQueries(roomQueryOptions({ param: { id: roomId } }))
    }
  })
}
