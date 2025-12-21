"use client"

import { formOptions } from "@tanstack/react-form"
import { Plus, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"
import { Visibility } from "@/prisma/generated/enums"

import { useCreateRoom } from "../hooks/use-create-room"
import { useRoomDetails } from "../hooks/use-room-details"
import { useUpdateRoom } from "../hooks/use-update-room"
import { type RoomSchema, roomSchema } from "../schemas"

const visibilityOptions = [
  { label: "Público", value: Visibility.PUBLIC },
  {
    label: "Privado",
    value: Visibility.PRIVATE
  },
  {
    label: "Qualquer pessoa com o link",
    value: Visibility.LINK
  }
]

const roomDefaultValues: RoomSchema = {
  name: "",
  description: "",
  visibility: "PUBLIC"
}

const roomFormOptions = formOptions({
  defaultValues: roomDefaultValues,
  validators: {
    onSubmit: roomSchema
  }
})

type RoomFormProps = {
  type: "create" | "edit"
}

export const RoomForm = ({ type }: RoomFormProps) => {
  const router = useRouter()
  const { id } = useParams<{ id?: string }>()

  const EDIT_MODE = type === "edit" && id

  const { data: room } = useRoomDetails({ param: { id: id ?? "" } })

  const { mutateAsync: createRoom } = useCreateRoom()
  const { mutateAsync: updateRoom } = useUpdateRoom()

  const form = useAppForm({
    ...roomFormOptions,
    defaultValues: room ?? roomDefaultValues,
    onSubmit: async ({ value }) => {
      if (EDIT_MODE) {
        await updateRoom({ param: { id }, json: value })
      } else {
        const room = await createRoom({ json: value })
        router.push(`/dashboard/room/${room.id}`)
      }
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="bg-background space-y-4 rounded-lg border px-4 py-6"
    >
      <FieldGroup>
        <form.AppField name="name">
          {({ InputField }) => <InputField label="Nome" placeholder="digite o nome da sala" />}
        </form.AppField>
        <form.AppField name="description">
          {({ InputField }) => (
            <InputField label="Descrição da Sala" placeholder="digite a descrição da sala" />
          )}
        </form.AppField>
        <form.AppField name="visibility">
          {({ SelectField }) => (
            <SelectField
              label="Visibilidade"
              placeholder="selecione a visibilidade da sala"
              options={visibilityOptions}
            />
          )}
        </form.AppField>
        <form.Subscribe selector={({ values }) => values.visibility}>
          {(visibility) =>
            visibility === Visibility.PRIVATE && (
              <form.AppField name="invites" mode="array">
                {(field) => (
                  <div className="space-y-4 rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-sans">Convidar usuários</h3>
                      <Button
                        type="button"
                        size="icon-sm"
                        onClick={() => field.pushValue({ email: "" })}
                      >
                        <Plus />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {field.state.value?.map((_, index) => (
                        <div key={index} className="relative flex items-end gap-2">
                          <form.AppField name={`invites[${index}].email`}>
                            {({ InputField }) => (
                              <InputField
                                label={`Convidado ${index + 1}`}
                                placeholder="digite o email do convidado"
                              />
                            )}
                          </form.AppField>
                          <Button
                            variant="destructive"
                            type="button"
                            size="icon-sm"
                            className="mb-0.5"
                            onClick={() => field.removeValue(index)}
                          >
                            <Trash />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </form.AppField>
            )
          }
        </form.Subscribe>
        <form.AppForm>
          <form.SubmitButton label={EDIT_MODE ? "Atualizar" : "Criar"} className="ml-auto" />
        </form.AppForm>
      </FieldGroup>
    </form>
  )
}
