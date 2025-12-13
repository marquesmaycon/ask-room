import { prisma } from "@/lib/prisma"

export const createRoomChunk = async (
  roomId: string,
  transcription: string,
  embeddings: number[]
) => {
  return await prisma.$transaction(async (tx) => {
    const chunk = await tx.roomChunk.create({
      data: { roomId, transcription }
    })

    await tx.$executeRaw`
      UPDATE audio_chunks 
      SET embeddings = ${JSON.stringify(embeddings)}::vector
      WHERE id = ${chunk.id}
    `

    return chunk
  })
}
