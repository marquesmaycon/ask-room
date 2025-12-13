"use client"

import { ChevronLeft, MessageCircleQuestionMark } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { FeedRoomContext } from "@/features/room/components/feed-room-context"
import { RecordRoomAudio } from "@/features/room/components/record-room-audio"
import { RoomQuestionForm } from "@/features/room/components/room-question-form"
import { useRoom } from "@/features/room/hooks/use-room"

export default function RoomPage() {
  const { id } = useParams<{ id: string }>()

  const { data: room } = useRoom({ param: { id } })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          <Link href="/">
            <Button size="icon-sm" variant="ghost">
              <ChevronLeft />
            </Button>
          </Link>
          <div>
            <h1 className="font-sans text-4xl">
              <b>{room?.name}</b>
            </h1>
            <p>{room?.description}</p>
          </div>
        </div>
        <div className="space-x-2">
          <FeedRoomContext />
          <RecordRoomAudio />
        </div>
      </div>
      <div className="space-y-4">
        <RoomQuestionForm />
        <div className="flex items-center gap-2">
          <MessageCircleQuestionMark />
          <h2 className="font-sans text-2xl font-semibold">Perguntas respondidas</h2>
        </div>
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
