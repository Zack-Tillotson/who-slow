'use client'

import { useDataState } from "@/state";
import { useForm, Controller } from "react-hook-form"

import { Button, TextInput } from "@mantine/core"
import { useRouter } from "next/navigation";

type ViewProps = {
  gameId?: string,
}

interface FormInputs {
  bggId: number
  name: string
}

export function GameForm({gameId}: ViewProps) {
  
  const router = useRouter()
  const {
    getGameForm,
    saveGame,
  } = useDataState()
  const game = getGameForm(gameId)
  
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: game,
  })
  const handleLocalSubmit = (data: FormInputs) => {
    try {
      const result = saveGame(data)
      router.push(`/game/${result.bggId}/`)
    } catch(e) {
      console.log(e)
      return
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLocalSubmit)}>
      <Controller
        name="bggId"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextInput {...field} label="BGG ID" />}
      />
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextInput {...field} label="Name" />}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}
