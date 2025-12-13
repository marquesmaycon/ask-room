import React from "react"

import { SignInForm } from "@/features/auth/components/sign-in-form"

export default function SignInPage() {
  return (
    <div>
      <div>
        <h1>Entrar com sua conta</h1>
      </div>
      <div>
        <SignInForm />
      </div>
    </div>
  )
}
