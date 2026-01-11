"use client"

import { FieldGroup } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"

import { useCreateRoomChunk } from "../hooks/use-create-room-chunk"
import { useUpdateRoomChunk } from "../hooks/use-update-room-chunk"
import { feedRoomSchema } from "../schemas"

type RoomChunkFormProps = {
  roomId?: string
  chunkId?: string
  text?: string
}

export function RoomChunkForm({ roomId, chunkId, text }: RoomChunkFormProps) {
  const { mutateAsync: create } = useCreateRoomChunk()
  const { mutateAsync: update } = useUpdateRoomChunk()

  const form = useAppForm({
    defaultValues: { text: text || "" },
    validators: {
      onSubmit: feedRoomSchema
    },
    onSubmit: async ({ value }) => {
      if (roomId) {
        await create({ param: { id: roomId }, json: value })
      } else if (chunkId) {
        await update({ param: { id: chunkId }, json: value })
      }
    }
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-4"
    >
      <FieldGroup className="md:flex-row md:items-end">
        <form.AppField name="text">
          {({ TextareaField }) => (
            <TextareaField
              label="Texto"
              placeholder="essa sala é sobre... os detalhes do do assunto é...."
            />
          )}
        </form.AppField>
      </FieldGroup>
      <form.AppForm>
        <form.SubmitButton label="Enviar" className="ml-auto" />
      </form.AppForm>
    </form>
  )
}
