import type { ComponentProps } from "react"

import { useFieldContext } from "@/hooks/form-context"
import { cn } from "@/lib/utils"

import { Field, FieldError, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"

type InputFieldProps = ComponentProps<typeof Textarea> & {
  label: string
}

export default function TextareaField({ label, className, ...props }: InputFieldProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        className={cn("min-h-[120px]", className)}
        {...props}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
