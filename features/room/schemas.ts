import z from "zod"

export const roomSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(200).optional()
})

export type RoomSchema = z.infer<typeof roomSchema>

export const questionSchema = z.object({
  question: z.string().min(1)
})

export const feedRoomSchema = z.object({
  text: z.string().min(1)
})
