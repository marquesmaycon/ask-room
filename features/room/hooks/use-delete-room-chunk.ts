import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomDetailsQueryOptions } from "./use-room-details"

const deleteRoomChunkRequest = client.api.rooms.chunks[":id"].$delete

type DeleteRoomChunkArgs = InferRequestType<typeof deleteRoomChunkRequest> & {
  roomId: string
}

export const useDeleteRoomChunk = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ param }: DeleteRoomChunkArgs) => {
      const res = await deleteRoomChunkRequest({ param })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }
    },
    onSuccess: (_, { roomId }) => {
      toast.success("Contexto deletado com sucesso.")
      queryClient.invalidateQueries(roomDetailsQueryOptions({ param: { id: roomId } }))
    },
    onError: (err) => {
      toast.error("Ocorreu um erro ao deletar o contexto.", { description: err.message })
    }
  })
}
