import z from "zod"

import { Visibility } from "@/prisma/generated/enums"

export const roomSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(200).nullable(),
  visibility: z.enum(Visibility),
  invites: z.array(z.object({ email: z.email() })).optional()
})

export type RoomSchema = z.infer<typeof roomSchema>

export const questionSchema = z.object({
  question: z.string().min(1)
})

export const feedRoomSchema = z.object({
  text: z.string().min(1)
})
