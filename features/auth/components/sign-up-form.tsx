"use client"

import { FieldGroup } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"

import { signUp } from "../actions"
import { signUpSchema } from "../schemas"

export const SignUpForm = () => {

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validators: {
      onSubmit: signUpSchema
    },
    onSubmit: async ({ value }) => {
      await signUp(value)
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
        <form.AppField name="name">
          {({ InputField }) => <InputField label="Nome" placeholder="digite seu nome" />}
        </form.AppField>
        <form.AppField name="email">
          {({ InputField }) => <InputField label="E-mail" placeholder="digite seu e-mail" />}
        </form.AppField>
        <form.AppField name="password">
          {({ InputField }) => (
            <InputField label="Senha" placeholder="digite sua senha" type="password" />
          )}
        </form.AppField>
        <form.AppField name="confirmPassword">
          {({ InputField }) => (
            <InputField
              label="Confirmação de Senha"
              placeholder="confirme sua senha"
              type="password"
            />
          )}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton label="Registrar" />
        </form.AppForm>
      </FieldGroup>
    </form>
  )
}
