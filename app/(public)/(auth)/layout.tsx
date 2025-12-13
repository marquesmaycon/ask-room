import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="bg-background mx-auto min-h-screen max-w-md px-4 py-10">
      <main>{children}</main>
    </div>
  )
}
