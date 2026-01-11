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
      UPDATE room_chunks 
      SET embeddings = ${JSON.stringify(embeddings)}::vector
      WHERE id = ${chunk.id}
    `

    return chunk
  })
}

export const updateRoomChunk = async (
  chunkId: string,
  transcription: string,
  embeddings: number[]
) => {
  return await prisma.$transaction(async (tx) => {
    const chunk = await tx.roomChunk.update({
      where: { id: chunkId },
      data: { transcription }
    })

    await tx.$executeRaw`
      UPDATE room_chunks 
      SET embeddings = ${JSON.stringify(embeddings)}::vector
      WHERE id = ${chunk.id}
    `

    return chunk
  })
}

type Chunk = {
  id: string
  transcription: string
  similarity: number
}

export const getSimilarTranscriptions = async (embeddings: number[], roomId: string) => {
  const embeddingsString = `[${embeddings.join(",")}]`

  const chunks = await prisma.$queryRaw<Chunk[]>`
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

  return chunks.map((c) => c.transcription)
}
