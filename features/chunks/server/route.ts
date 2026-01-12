import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import z from "zod"

import { updateRoomChunk } from "@/features/room/room-service"
import { prisma } from "@/lib/prisma"
import { authMiddleware, sessionMiddleware } from "@/lib/session-middleware"
import { generateEmbbedings } from "@/services/gemini"

const chunksController = new Hono()
  .use("*", sessionMiddleware)
  .put(
    "/:id",
    authMiddleware,
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", z.object({ text: z.string().min(1, "Text is required") })),
    async (c) => {
      const { id } = c.req.valid("param")
      const { text } = c.req.valid("json")
      const user = c.get("user")
      const isAdmin = c.get("isAdmin")

      const chunk = await prisma.roomChunk.findUniqueOrThrow({
        where: { id },
        include: { room: { select: { userId: true } } }
      })

      if (user?.id !== chunk.room.userId && !isAdmin) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      try {
        const embeddings = await generateEmbbedings(text)
        const updatedChunk = await updateRoomChunk(id, text, embeddings)

        return c.json({ chunk: updatedChunk }, 200)
      } catch (error) {
        console.error("Chunk update error:", error)
        return c.json(
          {
            message: error instanceof Error ? error.message : "Failed to update chunk"
          },
          500
        )
      }
    }
  )
  .delete("/:id", authMiddleware, zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param")
    const user = c.get("user")
    const isAdmin = c.get("isAdmin")

    const chunk = await prisma.roomChunk.findUniqueOrThrow({
      where: { id },
      include: { room: { select: { userId: true } } }
    })

    if (user?.id !== chunk.room.userId && !isAdmin) {
      return c.json({ message: "Unauthorized" }, 401)
    }

    await prisma.roomChunk.deleteMany({
      where: { id: chunk.id }
    })

    return c.body(null, 204)
  })

export default chunksController
