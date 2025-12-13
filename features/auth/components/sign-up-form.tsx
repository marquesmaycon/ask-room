"use client"

import Link from "next/link"

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
    >
      <FieldGroup>
        <form.AppField name="name">
          {({ InputField }) => <InputField label="Name" placeholder="digite seu nome" />}
        </form.AppField>
        <form.AppField name="email">
          {({ InputField }) => <InputField label="Email" placeholder="digite seu email" />}
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
          <form.SubmitButton label="Entrar" />
        </form.AppForm>
      </FieldGroup>
      <Link href="/sign-in">Já tem uma conta? Entre</Link>
    </form>
  )
}
