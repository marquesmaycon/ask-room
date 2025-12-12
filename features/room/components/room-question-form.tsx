"use client"

import { useParams } from "next/navigation"

import { FieldGroup } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"

import { useCreateRoomQuestion } from "../hooks/use-create-room-question"
import { questionSchema } from "../schemas"

export const RoomQuestionForm = () => {
  const { id } = useParams<{ id: string }>()
  const { mutateAsync } = useCreateRoomQuestion()

  const form = useAppForm({
    defaultValues: {
      question: ""
    },
    validators: {
      onSubmit: questionSchema
    },
    onSubmit: async ({ value }) => await mutateAsync({ param: { id }, json: value })
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-4 rounded-lg border p-4"
    >
      <h3>Ask a Question </h3>
      <FieldGroup>
        <form.AppField name="question">
          {({ InputField }) => <InputField label="Question" placeholder="Enter your question" />}
        </form.AppField>
      </FieldGroup>
      <form.AppForm>
        <form.SubmitButton label="Enviar" className="flex-1" />
      </form.AppForm>
    </form>
  )
}
