"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

import type { SignInSchema, SignUpSchema } from "./schemas"

export const signUp = async ({ name, email, password }: SignUpSchema) => {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      name,
      password
    }
  })

  if (result) redirect("/dashboard")
}

export const signIn = async ({ email, password }: SignInSchema) => {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password
    }
  })

  if (result) redirect("/dashboard")
}

export const signOut = async () => {
  return await auth.api.signOut({ headers: await headers() })
}

export const requireSession = async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    throw new Error("Não autorizado", { cause: 401 })
  }

  return session
}

export const requireOwnership = async (ownerId: string) => {
  const session = await requireSession()

  if (ownerId !== session.user.id) {
    throw new Error("Não permitido", { cause: 403 })
  }

  return session
}
