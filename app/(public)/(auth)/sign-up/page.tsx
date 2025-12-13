import { CircleUserRound } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SignUpForm } from "@/features/auth/components/sign-up-form"

export default function SignUpPage() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-2">
        <CircleUserRound />
        <h1 className="font-sans text-lg font-semibold">Cadastro</h1>
      </div>

      <SignUpForm />

      <div className="text-muted-foreground py-6 text-center text-sm">
        Não tem uma conta?{" "}
        <Button asChild variant="link">
          <Link href="/sign-in">Entrar</Link>
        </Button>
      </div>
    </div>
  )
}
