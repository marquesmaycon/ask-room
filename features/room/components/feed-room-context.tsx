import { BrainCog, TextSelect } from "lucide-react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAppForm } from "@/hooks/form"

import { useFeedRoom } from "../hooks/use-feed-room"
import { feedRoomSchema } from "../schemas"

export const FeedRoomContext = () => {
  const { id } = useParams<{ id: string }>()
  const { mutateAsync } = useFeedRoom()

  const form = useAppForm({
    defaultValues: { text: "" },
    validators: {
      onSubmit: feedRoomSchema
    },
    onSubmit: async ({ value }) => {
      await mutateAsync({ param: { id }, json: value })
      form.reset()
    }
  })
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm">
          Alimentar IA com Texto <TextSelect />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <BrainCog />
            <h3 className="font-sans font-medium">Envie conteúdo para a IA</h3>
          </div>
          <FieldGroup className="md:flex-row md:items-end">
            <form.AppField name="text">
              {({ TextareaField }) => (
                <TextareaField label="Pergunta" placeholder="coloque seu conteúdo aqui" />
              )}
            </form.AppField>
          </FieldGroup>
          <form.AppForm>
            <form.SubmitButton label="Alimentar IA" className="ml-auto" />
          </form.AppForm>
        </form>
      </PopoverContent>
    </Popover>
  )
}
