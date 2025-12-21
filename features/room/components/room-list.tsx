"use client"

import { LogIn } from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { extractInitials } from "@/lib/utils"

import { useRooms } from "../hooks/use-rooms"

export const RoomList = () => {
  const { data, isLoading } = useRooms()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((room) => (
          <li key={room.id}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
                <CardAction>
                  <Link href={`/room/${room.id}`}>
                    <Button variant="secondary" size="sm">
                      Entrar <LogIn />
                    </Button>
                  </Link>
                </CardAction>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Avatar className="">
                  <AvatarImage
                    src={room.user.image || undefined}
                    alt={room.user.name || "User avatar"}
                  />
                  <AvatarFallback className="bg-indigo-300">
                    {extractInitials(room.user.name || "")}
                  </AvatarFallback>
                </Avatar>
                <small className="ml-2">Criado por {room.user.name}</small>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
