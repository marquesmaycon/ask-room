import React from "react"

import { SignUpForm } from "@/features/auth/components/sign-up-form"

export default function SignUpPage() {
  return (
    <div>
      <div>
        <h1>Cadastro</h1>
      </div>
      <div>
        <SignUpForm />
      </div>
    </div>
  )
}
