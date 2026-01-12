import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import z from "zod"

import { prisma } from "@/lib/prisma"
import { authMiddleware, sessionMiddleware } from "@/lib/session-middleware"

const questionsController = new Hono()
  .use("*", sessionMiddleware)
  .patch(
    "/:id/pin",
    authMiddleware,
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param")
      const user = c.get("user")
      const isAdmin = c.get("isAdmin")

      const question = await prisma.question.findUniqueOrThrow({
        where: { id },
        include: { room: { select: { userId: true } } }
      })

      if (user?.id !== question.room.userId && !isAdmin) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      const data = await prisma.question.update({
        where: { id: question.id },
        data: { pinned: !question.pinned },
        select: { id: true, pinned: true }
      })

      return c.json({ question: data }, 200)
    }
  )
  .delete("/:id", authMiddleware, zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param")
    const user = c.get("user")
    const isAdmin = c.get("isAdmin")

    const question = await prisma.question.findUniqueOrThrow({
      where: { id },
      include: { room: { select: { userId: true } } }
    })

    if (user?.id !== question.room.userId && !isAdmin) {
      return c.json({ message: "Unauthorized" }, 401)
    }

    await prisma.question.deleteMany({
      where: { id: question.id }
    })

    return c.body(null, 204)
  })

export default questionsController
