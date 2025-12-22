"use client"

import { Cog, DoorClosed, FolderCode } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/ui/empty"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"

import { useMyRooms } from "../hooks/use-my-rooms"

export function MyRooms() {
  const { data } = useMyRooms()

  return (
    <div>
      <ul className="space-y-4">
        {data?.map((room) => (
          <li key={room.id}>
            <Item variant="outline" className="bg-background">
              <ItemContent>
                <ItemTitle>{room.name}</ItemTitle>
                <ItemDescription>{room.description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Link href={`/room/${room.id}`}>
                  <Button variant="outline" size="sm">
                    Acessar <DoorClosed />
                  </Button>
                </Link>
                <Link href={`/dashboard/room/${room.id}`}>
                  <Button variant="outline" size="sm">
                    Configurar <Cog />
                  </Button>
                </Link>
              </ItemActions>
            </Item>
          </li>
        ))}
      </ul>
      {data?.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderCode />
            </EmptyMedia>
            <EmptyTitle>Nenhuma sala ainda</EmptyTitle>
            <EmptyDescription>
              Você ainda não criou nenhuma sala. Comece criando sua primeira sala.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href="/dashboard/room/create">Criar Sala</Link>
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}
