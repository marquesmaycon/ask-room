import { createFormHook } from "@tanstack/react-form"
import { lazy } from "react"

const InputField = lazy(() => import("../components/form/input-field"))
const TextareaField = lazy(() => import("../components/form/textarea-field"))
const SelectField = lazy(() => import("../components/form/select-field"))
const SubmitButton = lazy(() => import("../components/form/submit-button"))

import { fieldContext, formContext } from "./form-context"

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    InputField,
    TextareaField,
    SelectField
  },
  formComponents: {
    SubmitButton
  },
  fieldContext,
  formContext
})
