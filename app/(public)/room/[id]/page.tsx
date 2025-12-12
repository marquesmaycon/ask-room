"use client"

import { useParams } from "next/navigation"

import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { RecordRoomAudio } from "@/features/room/components/record-room-audio"
import { RoomQuestionForm } from "@/features/room/components/room-question-form"
import { useRoom } from "@/features/room/hooks/use-room"

export default function RoomPage() {
  const { id } = useParams<{ id: string }>()

  const { data: room } = useRoom({ param: { id } })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1>
            Room: <b>{room?.name}</b>
          </h1>
          <p>{room?.description}</p>
        </div>
        <RecordRoomAudio />
      </div>
      <div className="space-y-4">
        <RoomQuestionForm />
        <h2>Perguntas</h2>
        <ul className="space-y-6">
          {room?.questions.map((question) => (
            <li key={question.id}>
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle>{question.question}</ItemTitle>
                  <ItemDescription>{question.answer}</ItemDescription>
                </ItemContent>
              </Item>
            </li>
          ))}
          {room?.questions.length === 0 && <p>No questions yet.</p>}
        </ul>
      </div>
    </div>
  )
}
