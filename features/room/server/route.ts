import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import z from "zod"

import { prisma } from "@/lib/prisma"

import { questionSchema, roomSchema } from "../schemas"

const roomsController = new Hono()
  .post("/", zValidator("json", roomSchema), async (c) => {
    const data = c.req.valid("json")

    const room = await prisma.room.create({
      data
    })

    return c.json({ data: room })
  })
  .post(
    "/:id/questions",
    zValidator("json", questionSchema),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param")
      const data = c.req.valid("json")

      const question = await prisma.question.create({
        data: {
          ...data,
          room: {
            connect: { id }
          }
        }
      })

      return c.json({ data: question })
    }
  )

export default roomsController
