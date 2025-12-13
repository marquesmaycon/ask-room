import { LogIn } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SignInForm } from "@/features/auth/components/sign-in-form"

export default function SignInPage() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-2">
        <LogIn />
        <h1 className="font-sans text-lg font-semibold">Entrar com sua conta</h1>
      </div>

      <SignInForm />

      <div className="text-muted-foreground py-6 text-center text-sm">
        Não tem uma conta?{" "}
        <Button asChild variant="link">
          <Link href="/sign-up">Cadastre-se</Link>
        </Button>
      </div>
    </div>
  )
}
