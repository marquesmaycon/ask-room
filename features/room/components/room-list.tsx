"use client"

import { LogIn } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"

import { useRooms } from "../hooks/use-rooms"

export const RoomList = () => {
  const { data, isLoading } = useRooms()

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
                    Entrar <LogIn />
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
