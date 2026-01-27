import { GoogleGenAI } from "@google/genai"

export const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

const model = "gemini-2.5-flash"

export async function transcribeAudio(audioBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: "Transcreva o áudio para portugês do Brasil. Seja preciso e natural, mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado. Se não houver nenhuma fala detectável no áudio, responda apenas com: SEM_FALA"
      },
      {
        inlineData: {
          mimeType,
          data: audioBase64
        }
      }
    ]
  })

  if (!response.text) {
    throw new Error("Failed to transcribe audio")
  }

  if (response.text.trim() === "SEM_FALA") {
    throw new Error("Audio does not contain any speech")
  }

  return response.text
}

const embeddingConfigs = {
  model: "text-embedding-004",
  taskType: "RETRIEVAL_DOCUMENT"
}

export async function generateEmbbedings(text: string) {
  const response = await gemini.models.embedContent({
    model: embeddingConfigs.model,
    contents: [{ text }],
    config: { taskType: embeddingConfigs.taskType }
  })

  if (!response.embeddings?.[0].values) {
    throw new Error("Failed to generate embeddings")
  }

  return response.embeddings[0].values
}

export async function callModels() {
  const response = await gemini.models.list()
  return response
}

const systemPrompt = `Você é um assistente educacional que responde perguntas baseado exclusivamente em conteúdos fornecidos.

REGRAS IMPORTANTES:
1. Responda APENAS em texto simples, sem qualquer formatação Markdown (sem **, ##, -, etc)
2. Use apenas informações contidas no conteúdo fornecido
3. Se a resposta não estiver disponível no conteúdo, responda: "Desculpe, não encontrei informações suficientes para responder essa pergunta no conteúdo disponível"
4. Mantenha um tom educativo, profissional e acessível
5. Organize a resposta em parágrafos claros quando necessário
6. Se for citar o conteúdo, use: "Conforme mencionado no conteúdo da aula..."
7. Seja objetivo e direto
8. Se a pergunta usar pronomes (Ele, Ela, Isso, Aquilo, Eles, Elas), identifique automaticamente quem ou o que esta sendo mencionada no conteúdo/contexto e responda baseado nela
9. Quando encontrar um pronome isolado, procure pela última coisa ou pessoa mencionada no conteúdo e use essa como referência`

export async function generateAnswer(question: string, transcriptions: string[]) {
  if (transcriptions.length === 0) {
    return null
  }

  const context = transcriptions.join("\n\n")

  const prompt = `${systemPrompt}

    CONTEÚDO DISPONÍVEL:
    ${context}

    PERGUNTA DO USUÁRIO:
    ${question}

    Responda a pergunta acima:
  `

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt
      }
    ]
  })

  if (!response.text) {
    throw new Error("Failed to generate answer")
  }

  return response.text
}
