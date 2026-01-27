"use client"

import { BrainCircuit, Loader2, MessageCircleQuestionMark } from "lucide-react"
import { redirect, useParams } from "next/navigation"

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Item, ItemContent, ItemTitle } from "@/components/ui/item"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

import { useRoom } from "../hooks/use-room"
import { RoomHeader } from "./room-header"
import { RoomQuestionForm } from "./room-question-form"

type RoomPageProps = {
  isAdmin: boolean
}

export function RoomPage({ isAdmin }: RoomPageProps) {
  const { id } = useParams<{ id: string }>()
  const { data: session, isPending } = authClient.useSession()

  const { data: room } = useRoom({ param: { id } })

  const isPrivate = room?.visibility === "PRIVATE"
  const isInvited = !isPending && room?.invites.some(({ email }) => email === session?.user?.email)
  const isMyRoom = !isPending && session?.user?.id === room?.userId

  if (isPrivate && !isInvited && !isMyRoom && !isAdmin) {
    redirect("/")
  }

  return (
    <div className="space-y-8">
      <RoomHeader showConfigButton={isMyRoom || isAdmin} room={room} />

      <RoomQuestionForm />

      <div className="flex items-center gap-2">
        <MessageCircleQuestionMark />
        <h2 className="font-sans text-2xl font-semibold">Perguntas respondidas</h2>
      </div>

      <ul className="space-y-6">
        {room?.questions.map(({ id, question, answer, pinned, user }) => {
          const temp = id.startsWith("temp-")
          return (
            <li key={id}>
              <Item
                variant="outline"
                className={cn(
                  pinned && "border-2 border-violet-500",
                  temp && "animate-pulse border-dashed"
                )}
              >
                <ItemContent>
                  <ItemTitle className="text-base">{question}</ItemTitle>
                  <ItemContent className="pt-4">
                    <div className="mb-2 flex items-center gap-2">
                      <BrainCircuit className="shrink-0" />{" "}
                      <p className="text-muted-foreground flex items-center gap-2">
                        {temp && <Loader2 className="inline-flex animate-spin" />}
                        {answer ||
                          "Não foi possivel encontrar encontrar uma resposta para essa pergunta."}
                      </p>
                    </div>
                    <small className="text-muted-foreground">
                      autor da pergunta: <i>{user?.name || "anônimo"}</i>
                    </small>
                  </ItemContent>
                </ItemContent>
              </Item>
            </li>
          )
        })}
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
  )
}
