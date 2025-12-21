import { LogIn } from "lucide-react"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"

import { auth } from "@/lib/auth"
import logo from "@/public/logo.svg"

import { ThemeSwitcher } from "../theme-switcher"
import { Button } from "../ui/button"
import { UserMenu } from "./user-menu"

export async function Header() {
  const session = await auth.api.getSession({ headers: await headers() })
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Ask Room" className="h-10" />
          <h2 className="font-sans text-3xl font-bold">Ask Room</h2>
        </Link>
        <div className="flex items-center gap-2">
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Button asChild variant="outline" size="sm">
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
