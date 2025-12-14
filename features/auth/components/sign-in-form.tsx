"use client"

import { useTransition } from "react"

import { FieldGroup } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"

import { signIn } from "../actions"
import { signInSchema } from "../schemas"

export const SignInForm = () => {
  const [isPending, startTransition] = useTransition()

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: signInSchema
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        await signIn(value)
      })
    }
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="bg-background rounded-xl border px-4 pt-6 pb-8 shadow-md"
    >
      <FieldGroup>
        <form.AppField name="email">
          {({ InputField }) => <InputField label="Email" placeholder="digite seu email" />}
        </form.AppField>
        <form.AppField name="password">
          {({ InputField }) => (
            <InputField label="Senha" placeholder="digite sua senha" type="password" />
          )}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton label="Entrar" loading={isPending} />
        </form.AppForm>
      </FieldGroup>
    </form>
  )
}
