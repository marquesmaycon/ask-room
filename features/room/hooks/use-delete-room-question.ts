import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomQueryOptions } from "./use-room"

const deleteRoomQuestionRequest = client.api.rooms.questions[":id"].$delete

type DeleteRoomQuestionArgs = InferRequestType<typeof deleteRoomQuestionRequest> & {
  roomId: string
}

export const useDeleteRoomQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ param }: DeleteRoomQuestionArgs) => {
      const res = await deleteRoomQuestionRequest({ param })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }
    },
    onSuccess: (_, { roomId }) => {
      toast.success("Pergunta deletada com sucesso.")
      queryClient.invalidateQueries(roomQueryOptions({ param: { id: roomId } }))
    },
    onError: (err) => {
      toast.error("Ocorreu um erro ao deletar a pergunta.", { description: err.message })
    }
  })
}
