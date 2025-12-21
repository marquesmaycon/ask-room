"use client"

import { Cog, DoorClosed } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"

import { useMyRooms } from "../hooks/use-my-rooms"

export function MyRooms() {
  const { data, isLoading } = useMyRooms()

  if (isLoading) {
    return <div>Loading...</div>
  }

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
    </div>
  )
}
