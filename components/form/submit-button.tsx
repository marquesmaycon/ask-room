import { SendHorizonal } from "lucide-react"
import type { ComponentProps } from "react"

import { useFormContext } from "@/hooks/form-context"

import { Button } from "../ui/button"

type SubmitButtonProps = ComponentProps<typeof Button> & {
  label: string
}

export default function SubmitButton({ label, ...props }: SubmitButtonProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => [state.isDirty]}>
      {([isDirty]) => (
        <Button type="submit" disabled={!isDirty} {...props} loading={form.state.isSubmitting}>
          {label || "Enviar"} <SendHorizonal />
        </Button>
      )}
    </form.Subscribe>
  )
}
