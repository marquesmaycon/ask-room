import { useMutation } from "@tanstack/react-query"
import type { InferRequestType } from "hono"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { client } from "@/lib/rpc"

import { myRoomsQueryOptions } from "./use-my-rooms"
import { roomsQueryOptions } from "./use-rooms"

const createRoomRequest = client.api.rooms.$post

type RequestType = InferRequestType<typeof createRoomRequest>

export const useCreateRoom = () => {
  const navigate = useRouter()
  return useMutation({
    mutationFn: async ({ json }: RequestType) => {
      const res = await createRoomRequest({ json })

      const { room } = await res.json()
      return room
    },
    onSuccess: (room, __, ___, { client }) => {
      toast.success("Room created successfully")
      client.invalidateQueries(roomsQueryOptions)
      client.invalidateQueries(myRoomsQueryOptions())
      navigate.push(`/room/${room.id}`)
    },
    onError: (err) => {
      toast.error("An error occurred while creating the room", { description: err.message })
    }
  })
}
