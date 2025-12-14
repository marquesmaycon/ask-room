import { useFieldContext } from "@/hooks/form-context"

import { Field, FieldError, FieldLabel } from "../ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type SelectFieldProps = {
  label?: string
  placeholder?: string
  options: { label: string; value: string }[]
}

export default function SelectField({ label, options, placeholder }: SelectFieldProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
      <Select name={field.name} value={field.state.value} onValueChange={field.handleChange}>
        <SelectTrigger id={field.name} aria-invalid={isInvalid} className="min-w-[120px]">
          <SelectValue placeholder={placeholder || "Select an option"} />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
}
