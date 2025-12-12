"use client"

import { formOptions } from "@tanstack/react-form"

import { FieldGroup } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"

import { useCreateRoom } from "../hooks/use-create-room"
import { type RoomSchema, roomSchema } from "../schemas"

const roomDefaultValues: RoomSchema = {
  name: "",
  description: ""
}

const roomFormOptions = formOptions({
  defaultValues: roomDefaultValues,
  validators: {
    onSubmit: roomSchema
  }
})

export const RoomForm = () => {
  const { mutateAsync } = useCreateRoom()

  const form = useAppForm({
    ...roomFormOptions,
    onSubmit: ({ value }) => {
      return mutateAsync({ json: value })
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.AppField name="name">
          {({ InputField }) => <InputField label="Room Name" placeholder="Enter room name" />}
        </form.AppField>
        <form.AppField name="description">
          {({ InputField }) => (
            <InputField label="Room Description" placeholder="Enter room description" />
          )}
        </form.AppField>
      </FieldGroup>
      <form.AppForm>
        <form.SubmitButton label="Salvar" className="flex-1" />
      </form.AppForm>
    </form>
  )
}
