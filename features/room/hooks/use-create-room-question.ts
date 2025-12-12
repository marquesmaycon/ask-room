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
      const { question } = await res.json()
      return question
    },
    onSuccess: () => {
      toast.success("Question created successfully")
      queryClient.invalidateQueries(roomsQueryOptions)
    },
    onError: () => {
      toast.error("An error occurred while creating the question.")
    }
  })
}
