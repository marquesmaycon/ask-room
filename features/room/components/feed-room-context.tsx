"use client"

import { TextSelect } from "lucide-react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { RoomChunkForm } from "./room-chunk-form"

export const FeedRoomContext = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="lg">
          Alimentar sala com Texto <TextSelect />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <RoomChunkForm roomId={id} />
      </PopoverContent>
    </Popover>
  )
}
