"use client"

import { BrainCircuit, Cog, MessageCircleQuestionMark } from "lucide-react"
import Link from "next/link"
import { redirect, useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Item, ItemContent, ItemTitle } from "@/components/ui/item"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

import { useRoom } from "../hooks/use-room"
import { RoomQuestionForm } from "./room-question-form"

export function RoomPage() {
  const { id } = useParams<{ id: string }>()
  const { data: session, isPending } = authClient.useSession()

  const { data: room } = useRoom({ param: { id } })

  const isMyRoom = !isPending && session?.user?.id === room?.userId

  if (
    room?.visibility === "PRIVATE" &&
    !room.invites.some(({ email }) => email === session?.user?.email) &&
    !isMyRoom
  ) {
    redirect("/")
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          <div>
            <h1 className="font-sans text-4xl">
              <b>{room?.name}</b>
            </h1>
            <p>{room?.description}</p>
          </div>
        </div>
        {isMyRoom && (
          <div className="space-x-2">
            <Button asChild variant="outline">
              <Link href={`/dashboard/room/${id}`}>
                Configurar <Cog />
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-8">
        <RoomQuestionForm />
        <div className="flex items-center gap-2">
          <MessageCircleQuestionMark />
          <h2 className="font-sans text-2xl font-semibold">Perguntas respondidas</h2>
        </div>
        <ul className="space-y-6">
          {room?.questions.map(({ id, question, answer, pinned, user }) => (
            <li key={id}>
              <Item variant="outline" className={cn(pinned && "border-2 border-violet-500")}>
                <ItemContent>
                  <ItemTitle className="text-base">{question}</ItemTitle>
                  <ItemContent className="pt-4">
                    <div className="mb-2 flex items-center gap-2">
                      <BrainCircuit className="shrink-0" />{" "}
                      <p className="text-muted-foreground">{answer}</p>
                    </div>
                    <small className="text-muted-foreground">
                      autor da pergunta: <i>{user?.name || "anônimo"}</i>
                    </small>
                  </ItemContent>
                </ItemContent>
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
