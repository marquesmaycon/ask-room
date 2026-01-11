import { useMutation } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { roomDetailsQueryOptions } from "./use-room-details"

const deleteRoomChunkRequest = client.api.rooms.chunks[":id"].$delete

type DeleteRoomChunkArgs = InferRequestType<typeof deleteRoomChunkRequest> & {
  roomId: string
}

export const useDeleteRoomChunk = () => {
  return useMutation({
    mutationFn: async ({ param }: DeleteRoomChunkArgs) => {
      const res = await deleteRoomChunkRequest({ param })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message)
      }
    },
    onMutate: async ({ roomId, param }, { client }) => {
      const opts = roomDetailsQueryOptions({ param: { id: roomId } })

      await client.cancelQueries(opts)
      const previousData = client.getQueryData(opts.queryKey)

      client.setQueryData(opts.queryKey, (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          room: {
            ...oldData,
            roomChunks: oldData.roomChunks.filter((chunk) => chunk.id !== param.id)
          }
        }
      })

      return { previousData }
    },
    onSuccess: () => {
      toast.success("Contexto deletado com sucesso.")
    },
    onError: (err, { roomId: id }, res, { client }) => {
      client.setQueryData(roomDetailsQueryOptions({ param: { id } }).queryKey, res?.previousData)
      toast.error("Ocorreu um erro ao deletar o contexto.", { description: err.message })
    },
    onSettled: (_, __, { roomId }, ___, { client }) => {
      client.invalidateQueries(roomDetailsQueryOptions({ param: { id: roomId } }))
    }
  })
}
