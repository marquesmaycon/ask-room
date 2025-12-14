import { BrainCircuit, Lock, LogIn } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"

import { auth } from "@/lib/auth"

import { ThemeSwitcher } from "../theme-switcher"
import { Button } from "../ui/button"
import { UserMenu } from "./user-menu"

export async function Header() {
  const session = await auth.api.getSession({ headers: await headers() })
  return (
    <header>
      <div className="flex items-center justify-between py-6">
        <Link href="/">
          <h2 className="font-sans text-3xl font-bold">
            <BrainCircuit className="mr-2 inline size-10" />
            Ask Room
          </h2>
        </Link>
        <div className="flex items-center gap-8">
          <Button variant="outline" size="sm">
            <Lock /> Código de Acesso
          </Button>
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Button asChild variant="secondary" size="sm">
              <Link href="/sign-in">
                <LogIn /> Entrar
              </Link>
            </Button>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
