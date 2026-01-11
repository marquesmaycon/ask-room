"use client"

import { ArrowRight, FingerprintPattern } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { RoomForm } from "@/features/room/components/room-form"
import { useRoomDetails } from "@/features/room/hooks/use-room-details"

import { RoomChunks } from "./room-chunks"
import { RoomQuestions } from "./room-questions"

export function RoomConfig({ id }: { id: string }) {
  const { data: room } = useRoomDetails({ param: { id } })

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground font-sans text-2xl">
          Configurar: <span className="text-primary font-bold">{room?.name}</span>
        </h1>

        <Button asChild variant="link">
          <Link href={`/room/${id}`}>
            Acessar sala
            <ArrowRight />
          </Link>
        </Button>
      </div>

      <div>
        <h3 className="text-primary decoration-primary mb-4 flex items-center gap-2 font-sans text-xl font-bold underline decoration-dotted decoration-3 underline-offset-2">
          <FingerprintPattern /> Identificação
        </h3>
        <RoomForm type="edit" />
      </div>

      <div className="space-y-12">
        <RoomChunks roomId={id} />
        <RoomQuestions roomId={id} />
      </div>
    </div>
  )
}
