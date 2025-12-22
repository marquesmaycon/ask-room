import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { auth } from "@/lib/auth"

export default async function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect("/sign-in")
  }

  return (
    <div className="bg-slate-200 dark:bg-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}
