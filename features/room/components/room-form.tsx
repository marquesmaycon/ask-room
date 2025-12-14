"use client"

import { formOptions } from "@tanstack/react-form"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"
import { Visibility } from "@/prisma/generated/enums"

import { useCreateRoom } from "../hooks/use-create-room"
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

export const RoomForm = () => {
  const router = useRouter()
  const { mutateAsync } = useCreateRoom()

  const form = useAppForm({
    ...roomFormOptions,
    onSubmit: async ({ value }) => {
      const room = await mutateAsync({ json: value })
      router.push(`/room/${room.id}`)
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-4 rounded-lg border px-4 py-6"
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
                      <Button type="button" size="icon-sm" onClick={() => field.pushValue("")}>
                        <Plus />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {field.state.value?.map((_, index) => (
                        <form.AppField key={index} name={`invites[${index}]`}>
                          {({ InputField }) => (
                            <InputField
                              label={`Convidado ${index + 1}`}
                              placeholder="digite o email do convidado"
                            />
                          )}
                        </form.AppField>
                      ))}
                    </div>
                  </div>
                )}
              </form.AppField>
            )
          }
        </form.Subscribe>
        <form.AppForm>
          <form.SubmitButton label="Criar" className="ml-auto" />
        </form.AppForm>
      </FieldGroup>
    </form>
  )
}
