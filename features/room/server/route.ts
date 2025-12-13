import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import z from "zod"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { sessionMiddleware } from "@/lib/session-middleware"
import { generateAnswer, generateEmbbedings, transcribeAudio } from "@/services/gemini"

import { createRoomChunk } from "../room-service"
import { questionSchema, roomSchema } from "../schemas"

const roomIdParamValidator = zValidator("param", z.object({ id: z.string() }))

const roomsController = new Hono()
  .get("/", async (c) => {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        name: true,
        description: true,

        _count: { select: { questions: true } }
      },
      orderBy: { createdAt: "desc" }
    })

    return c.json({ rooms })
  })
  .get("/:id", roomIdParamValidator, async (c) => {
    const { id } = c.req.valid("param")

    const room = await prisma.room.findUnique({
      where: { id },
      include: { questions: true }
    })

    return c.json({ room })
  })
  .post("/", sessionMiddleware, zValidator("json", roomSchema), async (c) => {
    const data = c.req.valid("json")
    const user = c.get("user")

    const room = await prisma.room.create({
      data: {
        ...data,
        user: {
          connect: { id: user?.id }
        }
      }
    })

    return c.json({ room })
  })
  .post("/:id/questions", roomIdParamValidator, zValidator("json", questionSchema), async (c) => {
    const { id: roomId } = c.req.valid("param")
    const { question } = c.req.valid("json")

    const session = await auth.api.getSession()

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
        FROM audio_chunks
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
        userId: session?.user?.id || null
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
    }
  )
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

export default roomsController
