import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import z from "zod"

import { prisma } from "@/lib/prisma"
import { generateEmbbedings, transcribeAudio } from "@/services/gemini"

import { questionSchema, roomSchema } from "../schemas"

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

    return c.json({ data: rooms })
  })
  .get(
    "/:id/questions",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param")

      const questions = await prisma.question.findMany({
        where: { roomId: id },
        orderBy: { createdAt: "desc" }
      })

      return c.json({ data: questions })
    }
  )
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
  .post(
    "/:id/audio",
    zValidator("param", z.object({ id: z.string() })),
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

        const result = await prisma.$queryRaw<Array<{ id: string }>>`
          INSERT INTO audio_chunks ("roomId", transcription, embeddings, "createdAt", "updatedAt")
          VALUES (${roomId}, ${transcription}, ${JSON.stringify(embeddings)}::vector, NOW(), NOW())
          RETURNING id
        `

        if (!result || result.length === 0) {
          return c.json({ error: "Failed to save audio chunk" }, 500)
        }

        return c.json(
          {
            data: {
              id: result[0].id,
              transcription,
              embeddings,
              roomId
            }
          },
          201
        )
      } catch (error) {
        console.error("Audio processing error:", error)
        return c.json(
          {
            error:
              error instanceof Error ? error.message : "Failed to process audio"
          },
          500
        )
      }
    }
  )

export default roomsController
