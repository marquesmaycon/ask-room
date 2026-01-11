"use client"

import { BadgeQuestionMark, Brain, MessageCircleQuestionMark, Pin } from "lucide-react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Toggle } from "@/components/ui/toggle"
import { useConfirm } from "@/hooks/use-confirm"

import { useDeleteRoomChunk } from "../hooks/use-delete-room-chunk"
import { useDeleteRoomQuestion } from "../hooks/use-delete-room-question"
import { usePinQuestion } from "../hooks/use-pin-question"
import { useRoomDetails } from "../hooks/use-room-details"
import { FeedRoomContext } from "./feed-room-context"
import { RecordRoomAudio } from "./record-room-audio"

export function RoomDetails() {
  const { id: roomId } = useParams<{ id: string }>()

  const { data: room } = useRoomDetails({ param: { id: roomId } })

  const {
    mutateAsync: deleteQuestion,
    isPending: isDeletingQuestion,
    variables: questionVars
  } = useDeleteRoomQuestion()

  const {
    mutateAsync: deleteChunk,
    isPending: isDeletingChunk,
    variables: chunkVars
  } = useDeleteRoomChunk()
  const { mutateAsync: pinQuestion } = usePinQuestion()

  const confirm = useConfirm()

  async function handleDeleteChunk(chunkId: string, roomId: string) {
    const ok = await confirm({
      description:
        "Tem certeza que deseja excluir esta transcrição? Esta ação não pode ser desfeita.",
      confirmLabel: "Excluir permanentemente",
      variant: "destructive"
    })
    if (!ok) return
    await deleteChunk({ param: { id: chunkId }, roomId })
  }

  async function handleDeleteQuestion(questionId: string, roomId: string) {
    const ok = await confirm({
      description: "Tem certeza que deseja excluir esta pergunta? Esta ação não pode ser desfeita.",
      confirmLabel: "Excluir permanentemente",
      variant: "destructive"
    })
    if (!ok) return
    await deleteQuestion({ param: { id: questionId }, roomId })
  }

  return (
    <div className="space-y-12">
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-sans text-xl">
          <Brain /> Inteligência
        </h3>
        <div className="bg-background space-y-4 rounded-md p-4">
          <div className="flex flex-wrap items-center justify-evenly gap-4 py-6">
            <FeedRoomContext />
            <RecordRoomAudio />
          </div>
          <div className="space-y-4">
            <h4 className="font-sans font-semibold">Transcrições</h4>
            <ul className="space-y-4">
              {room?.roomChunks?.map(({ id, transcription, updatedAt }) => (
                <li key={id}>
                  <Item variant="muted" className="flex-col items-end md:flex-row md:items-center">
                    <ItemContent className="font-mono text-balance">{transcription}</ItemContent>
                    <ItemDescription className="text-xs">
                      Atualizado em{" "}
                      {new Date(updatedAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </ItemDescription>
                    <ItemActions>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(transcription)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteChunk(id, roomId)}
                        loading={isDeletingChunk && chunkVars?.param.id === id}
                      >
                        Excluir
                      </Button>
                    </ItemActions>
                  </Item>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 font-sans text-xl">
          <BadgeQuestionMark /> Perguntas e Respostas
        </h3>
        <div className="bg-background space-y-4 rounded-md p-4">
          <ul className="space-y-4">
            {room?.questions?.map(({ id, question, answer, pinned }) => (
              <li key={id}>
                <Item variant="outline" className="bg-background">
                  <ItemContent>
                    <ItemTitle>{question}</ItemTitle>
                    <ItemDescription>{answer}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Toggle
                      aria-label="Fixar Pergunta"
                      size="sm"
                      variant="outline"
                      className="group data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-indigo-500 data-[state=on]:*:[svg]:stroke-indigo-500"
                      pressed={pinned}
                      onClick={() => pinQuestion({ param: { id }, roomId })}
                    >
                      <Pin />
                      <span className="hidden group-data-[state=on]:inline">Desfixar</span>
                      <span className="hidden group-data-[state=off]:inline">Fixar</span>
                    </Toggle>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteQuestion(id, roomId)}
                      loading={isDeletingQuestion && questionVars?.param.id === id}
                    >
                      Excluir
                    </Button>
                  </ItemActions>
                </Item>
              </li>
            ))}
            {room?.questions.length === 0 && (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <MessageCircleQuestionMark />
                  </EmptyMedia>
                  <EmptyTitle>Nenhuma pergunta ainda</EmptyTitle>
                </EmptyHeader>
              </Empty>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
