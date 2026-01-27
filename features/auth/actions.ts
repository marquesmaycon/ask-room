"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

import type { SignInSchema, SignUpSchema } from "./schemas"

export const signUp = async ({ name, email, password }: SignUpSchema) => {
  try {
    await auth.api.signUpEmail({
      body: { email, name, password }
    })
  } catch (error) {
    console.error("Erro ao criar conta:", error)
    throw new Error(error instanceof Error ? error.message : String(error))
  }
}

export const signIn = async ({ email, password }: SignInSchema) => {
  try {
    await auth.api.signInEmail({
      body: { email, password }
    })
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    throw new Error(error instanceof Error ? error.message : String(error))
  }
  redirect("/dashboard")
}

export const signOut = async () => await auth.api.signOut({ headers: await headers() })
