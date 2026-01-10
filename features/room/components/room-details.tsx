"use client"

import { BadgeQuestionMark, Brain, MessageCircleQuestionMark, Pin } from "lucide-react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Toggle } from "@/components/ui/toggle"

import { useDeleteRoomQuestion } from "../hooks/use-delete-room-question"
import { usePinQuestion } from "../hooks/use-pin-question"
import { useRoomDetails } from "../hooks/use-room-details"
import { FeedRoomContext } from "./feed-room-context"
import { RecordRoomAudio } from "./record-room-audio"

export function RoomDetails() {
  const { id: roomId } = useParams<{ id: string }>()

  const { data: room } = useRoomDetails({ param: { id: roomId } })
  const { mutateAsync: deleteQuestion } = useDeleteRoomQuestion()
  const { mutateAsync: pinQuestion } = usePinQuestion()

  return (
    <div className="space-y-12">
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-sans text-xl">
          <Brain /> Inteligência
        </h3>
        <div className="bg-background space-y-4 rounded-md p-4">
          <div className="flex items-center justify-evenly py-6">
            <FeedRoomContext />
            <RecordRoomAudio />
          </div>
          <div className="space-y-4">
            <h4 className="font-sans font-semibold">Transcrições</h4>
            <ul className="space-y-4">
              {room?.roomChunks?.map(({ id, transcription, updatedAt }) => (
                <li key={id}>
                  <Item variant="muted">
                    <ItemContent className="font-mono">{transcription}</ItemContent>
                    <ItemDescription>
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
                        onClick={() => navigator.clipboard.writeText(transcription)}
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
                      onClick={() => deleteQuestion({ param: { id }, roomId })}
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
