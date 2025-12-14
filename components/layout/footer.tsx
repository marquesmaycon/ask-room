import type React from "react"

import { cn } from "@/lib/utils"

type FooterProps = React.HTMLAttributes<HTMLElement>

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn("mt-auto", className)} {...props}>
      <p className="text-muted-foreground text-center text-sm">
        &copy; {new Date().getFullYear()} Ask Room. Todos os direitos reservados.
      </p>
    </footer>
  )
}
