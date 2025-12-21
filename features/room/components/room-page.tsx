"use client"

import { Cog, MessageCircleQuestionMark } from "lucide-react"
import Link from "next/link"
import { redirect, useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

import { useRoom } from "../hooks/use-room"
import { RoomQuestionForm } from "./room-question-form"

export function RoomPage() {
  const { id } = useParams<{ id: string }>()
  const { data: session, isPending } = authClient.useSession()

  const { data: room } = useRoom({ param: { id } })

  const isMyRoom = session?.user?.id === room?.userId

  if (
    room?.visibility === "PRIVATE" &&
    room.invites.some(({ email }) => email === session?.user?.email) === false &&
    !isMyRoom
  ) {
    redirect("/")
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          <div>
            <h1 className="font-sans text-4xl">
              <b>{room?.name}</b>
            </h1>
            <p>{room?.description}</p>
          </div>
        </div>
        <div className={cn("space-x-2", !isMyRoom && "hidden")}>
          <Button asChild variant="outline">
            <Link href={`/dashboard/room/${id}`}>
              Configurar <Cog />
            </Link>
          </Button>
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
