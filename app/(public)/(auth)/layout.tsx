import { BrainCircuit } from "lucide-react"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

import { Footer } from "@/components/layout/footer"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { auth } from "@/lib/auth"
import logo from "@/public/logo.svg"

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
    <div className="flex min-h-screen items-center justify-around bg-slate-100 px-4 py-10 dark:bg-slate-900">
      <div className="absolute top-12 right-12">
        <ThemeSwitcher />
      </div>

      <div className="fixed top-12">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Ask Room" className="h-10" />
          <h1 className="font-sans text-3xl font-bold">Ask Room</h1>
        </Link>
      </div>

      <main className="w-full max-w-md">{children}</main>

      <Footer className="fixed bottom-12 mx-auto" />
    </div>
  )
}
