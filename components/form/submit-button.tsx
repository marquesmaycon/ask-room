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
    <form.Subscribe selector={(state) => [state.isDirty, state.isSubmitting]}>
      {([isDirty, isSubmitting]) => (
        <Button
          type="submit"
          disabled={!isDirty}
          {...props}
          loading={isSubmitting || props.loading}
        >
          {label || "Enviar"} <SendHorizonal />
        </Button>
      )}
    </form.Subscribe>
  )
}
