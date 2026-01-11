"use client"

import { BadgeQuestionMark, MessageCircleQuestionMark, Pin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Toggle } from "@/components/ui/toggle"
import { useConfirm } from "@/hooks/use-confirm"

import { useDeleteRoomQuestion } from "../hooks/use-delete-room-question"
import { usePinQuestion } from "../hooks/use-pin-question"
import { useRoomDetails } from "../hooks/use-room-details"

export function RoomQuestions({ roomId }: { roomId: string }) {
  const { data: room } = useRoomDetails({ param: { id: roomId } })

  const { mutateAsync: deleteQuestion, isPending, variables } = useDeleteRoomQuestion()
  const { mutateAsync: pinQuestion } = usePinQuestion()

  const confirm = useConfirm()

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
                    loading={isPending && variables?.param.id === id}
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
  )
}
