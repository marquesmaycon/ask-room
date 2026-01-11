"use client"

import { PopoverArrow } from "@radix-ui/react-popover"
import { Brain } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription } from "@/components/ui/item"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useConfirm } from "@/hooks/use-confirm"

import { useDeleteRoomChunk } from "../hooks/use-delete-room-chunk"
import { useRoomDetails } from "../hooks/use-room-details"
import { FeedRoom } from "./feed-room"
import { RoomChunkForm } from "./room-chunk-form"

export function RoomChunks({ roomId }: { roomId: string }) {
  const { data: room } = useRoomDetails({ param: { id: roomId } })

  const { mutateAsync: deleteChunk, isPending, variables } = useDeleteRoomChunk()

  const confirm = useConfirm()

  async function handleDeleteChunk(chunkId: string, roomId: string) {
    const ok = await confirm({
      description:
        "Tem certeza que deseja excluir esta transcrição? Esta ação não pode ser desfeita.",
      confirmLabel: "Excluir permanentemente",
      variant: "destructive"
    })
    if (!ok) return

    await deleteChunk({ param: { id: chunkId }, roomId })
  }
  return (
    <div>
      <h3 className="text-primary decoration-primary mb-4 flex items-center gap-2 font-sans text-xl font-bold underline decoration-dotted decoration-3 underline-offset-2">
        <Brain /> Inteligência
      </h3>
      <div className="bg-background space-y-4 rounded-md p-4">
        <FeedRoom />
        <div className="space-y-4">
          <h4 className="font-sans font-semibold">Transcrições</h4>
          <ul className="space-y-4">
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
                    <ItemActions>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(transcription)}
                          >
                            Editar
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <RoomChunkForm chunkId={id} text={transcription} />
                          <PopoverArrow className="fill-border" />
                        </PopoverContent>
                      </Popover>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteChunk(id, roomId)}
                        loading={isPending && variables?.param.id === id}
                      >
                        Excluir
                      </Button>
                    </ItemActions>
                  </div>
                </Item>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
