"use client"

import { Cog } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Item, ItemContent, ItemDescription } from "@/components/ui/item"

import type { ResponseType } from "../hooks/use-room"

type RoomContentProps = {
  showConfigButton?: boolean
  room?: ResponseType["room"]
}

export function RoomHeader({ showConfigButton, room }: RoomContentProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          <div>
            <h1 className="font-sans text-4xl">
              <b>{room?.name}</b>
            </h1>
            <p>{room?.description}</p>
          </div>
        </div>

        {showConfigButton && (
          <div className="space-x-2">
            <Button asChild variant="outline">
              <Link href={`/dashboard/room/${room?.id}`}>
                Configurar <Cog />
              </Link>
            </Button>
          </div>
        )}
      </div>

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            Ver conteúdo
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 rounded border border-dashed">
          <ul className="space-y-4 p-2">
            {room?.roomChunks?.map(({ id, transcription, updatedAt }) => (
              <li key={id}>
                <Item variant="muted" className="flex-col items-start">
                  <ItemContent>{transcription}</ItemContent>
                  <div className="flex w-full items-center justify-between gap-4">
                    <ItemDescription className="text-xs">
                      {new Date(updatedAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </ItemDescription>
                  </div>
                </Item>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
