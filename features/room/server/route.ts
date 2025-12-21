import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import z from "zod"

import { prisma } from "@/lib/prisma"
import { authMiddleware, sessionMiddleware } from "@/lib/session-middleware"
import { generateAnswer, generateEmbbedings, transcribeAudio } from "@/services/gemini"

import { createRoomChunk } from "../room-service"
import { questionSchema, roomSchema } from "../schemas"

const roomIdParamValidator = zValidator("param", z.object({ id: z.string() }))

const roomsController = new Hono()
  .use("*", sessionMiddleware)
  .get("/", async (c) => {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        name: true,
        description: true,

        _count: { select: { questions: true } }
      },
      where: { visibility: "PUBLIC" },
      orderBy: { createdAt: "desc" }
    })

    return c.json({ rooms })
  })
  .get("/my-rooms", authMiddleware, async (c) => {
    const user = c.get("user")

    const rooms = await prisma.room.findMany({
      where: { userId: user?.id },
      orderBy: { createdAt: "desc" }
    })

    return c.json({ rooms })
  })
  .get("/:id/details", authMiddleware, roomIdParamValidator, async (c) => {
    const { id } = c.req.valid("param")
    const user = c.get("user")

    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: [{ pinned: "desc" }, { createdAt: "asc" }]
        },
        invites: true,
        roomChunks: true
      }
    })

    if (user?.id !== room?.userId) {
      return c.json({ message: "Unauthorized" }, 401)
    }

    return c.json({ room }, 200)
  })
  .get("/:id", roomIdParamValidator, async (c) => {
    const { id } = c.req.valid("param")

    const room = await prisma.room.findUniqueOrThrow({
      where: { id },
      include: { questions: true, invites: true }
    })

    return c.json({ room })
  })
  .post("/", authMiddleware, zValidator("json", roomSchema), async (c) => {
    const { invites, ...data } = c.req.valid("json")
    const user = c.get("user")

    const room = await prisma.room.create({
      data: {
        ...data,
        user: {
          connect: { id: user?.id }
        }
      }
    })

    if (invites && invites.length > 0) {
      await prisma.invite.createMany({
        data: invites.map(({ email }) => ({
          email,
          roomId: room.id
        }))
      })
    }

    return c.json({ room })
  })
  .put("/:id", authMiddleware, roomIdParamValidator, zValidator("json", roomSchema), async (c) => {
    const { id } = c.req.valid("param")
    const { invites, ...data } = c.req.valid("json")
    const user = c.get("user")

    const room = await prisma.room.findUniqueOrThrow({
      where: { id }
    })

    if (user?.id !== room.userId) {
      return c.json({ message: "Unauthorized" }, 401)
    }

    const updated = await prisma.room.update({
      where: { id },
      data
    })

    // TO DO => EVITAR DUPLICIDADES
    if (invites && invites.length > 0) {
      await prisma.invite.createMany({
        data: invites.map(({ email }) => ({
          email,
          roomId: room.id
        })),
        skipDuplicates: true
      })
    }

    await prisma.invite.deleteMany({
      where: {
        roomId: id,
        email: {
          notIn: invites?.map(({ email }) => email)
        }
      }
    })

    return c.json({ room: updated }, 200)
  })
  .post("/:id/questions", roomIdParamValidator, zValidator("json", questionSchema), async (c) => {
    const { id: roomId } = c.req.valid("param")
    const { question } = c.req.valid("json")

    const user = c.get("user")

    const embeddings = await generateEmbbedings(question)
    const embeddingsString = `[${embeddings.join(",")}]`

    const chunks = await prisma.$queryRaw<
      Array<{
        id: string
        transcription: string
        similarity: number
      }>
    >`
        SELECT 
          id,
          transcription,
          1 - (embeddings <=> ${embeddingsString}::vector) as similarity
        FROM room_chunks
        WHERE "roomId" = ${roomId}
          AND 1 - (embeddings <=> ${embeddingsString}::vector) > 0.7
        ORDER BY embeddings <=> ${embeddingsString}::vector
        LIMIT 5
      `

    const transcriptions = chunks.map((chunk) => chunk.transcription)

    const answer = await generateAnswer(question, transcriptions)

    const newQuestion = await prisma.question.create({
      data: {
        roomId,
        question,
        answer,
        userId: user?.id || null
      },
      select: {
        id: true,
        question: true,
        answer: true,
        createdAt: true
      }
    })

    if (!newQuestion) {
      return c.json({ error: "Failed to create question" }, 500)
    }

    return c.json({ question: newQuestion }, 201)
  })
  .post(
    "/:id/text",
    roomIdParamValidator,
    zValidator(
      "json",
      z.object({
        text: z.string().min(1, "Text is required")
      })
    ),
    async (c) => {
      const { id: roomId } = c.req.valid("param")

      try {
        const { text } = c.req.valid("json")

        const embeddings = await generateEmbbedings(text)

        const roomChunk = await createRoomChunk(roomId, text, embeddings)

        return c.json(
          {
            id: roomChunk.id,
            transcription: text,
            embeddings,
            roomId
          },
          201
        )
      } catch (error) {
        console.error("Text processing error:", error)
        return c.json(
          {
            error: error instanceof Error ? error.message : "Failed to process text"
          },
          500
        )
      }
    }
  )
  .post(
    "/:id/audio",
    roomIdParamValidator,
    zValidator(
      "form",
      z.object({
        audio: z.instanceof(File)
      })
    ),
    async (c) => {
      const { id: roomId } = c.req.valid("param")

      try {
        const { audio } = c.req.valid("form")

        if (!audio) {
          return c.json({ error: "No audio file uploaded" }, 400)
        }

        const audioBuffer = await audio.arrayBuffer()
        const audioBase64 = Buffer.from(audioBuffer).toString("base64")
        const mimeType = audio.type || "audio/mpeg"

        const transcription = await transcribeAudio(audioBase64, mimeType)
        const embeddings = await generateEmbbedings(transcription)

        const roomChunk = await createRoomChunk(roomId, transcription, embeddings)

        return c.json(
          {
            id: roomChunk.id,
            transcription,
            embeddings,
            roomId
          },
          201
        )
      } catch (error) {
        console.error("Audio processing error:", error)
        return c.json(
          {
            error: error instanceof Error ? error.message : "Failed to process audio"
          },
          500
        )
      }
    }
  )
  .patch(
    "/questions/:id/pin",
    authMiddleware,
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param")
      const user = c.get("user")

      const question = await prisma.question.findUniqueOrThrow({
        where: { id },
        include: { room: { select: { userId: true } } }
      })

      if (user?.id !== question.room.userId) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      await prisma.question.update({
        where: { id: question.id },
        data: { pinned: !question.pinned }
      })

      return c.body(null, 204)
    }
  )
  .delete(
    "/questions/:id",
    authMiddleware,
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param")
      const user = c.get("user")

      const question = await prisma.question.findUniqueOrThrow({
        where: { id },
        include: { room: { select: { userId: true } } }
      })

      if (user?.id !== question.room.userId) {
        return c.json({ message: "Unauthorized" }, 401)
      }

      await prisma.question.deleteMany({
        where: { id: question.id }
      })

      return c.body(null, 204)
    }
  )

export default roomsController
