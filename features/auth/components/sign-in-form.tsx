"use client"

import { FieldGroup } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"

import { signIn } from "../actions"
import { signInSchema } from "../schemas"

export const SignInForm = () => {
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: signInSchema
    },
    onSubmit: async ({ value }) => {
      await signIn(value)
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
        <form.AppField name="email">
          {({ InputField }) => <InputField label="Email" placeholder="digite seu email" />}
        </form.AppField>
        <form.AppField name="password">
          {({ InputField }) => (
            <InputField label="Senha" placeholder="digite sua senha" type="password" />
          )}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton label="Entrar" />
        </form.AppForm>
      </FieldGroup>
    </form>
  )
}
