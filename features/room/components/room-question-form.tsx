"use client"

import { BotMessageSquare } from "lucide-react"
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
    onSubmit: async ({ value }) => {
      await mutateAsync({ param: { id }, json: value })
      form.reset()
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-4 rounded-lg border bg-slate-800 p-4 pb-6"
    >
      <div className="flex items-center gap-2">
        <BotMessageSquare />
        <h3 className="font-sans text-lg font-medium">Faça uma pergunta e a IA responderá</h3>
      </div>
      <FieldGroup className="md:flex-row md:items-end">
        <form.AppField name="question">
          {({ InputField }) => <InputField label="Pergunta" placeholder="digite sua pergunta" />}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton label="Perguntar" className="ml-auto" />
        </form.AppForm>
      </FieldGroup>
    </form>
  )
}
