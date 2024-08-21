'use client'

import { useDataState } from "@/state";
import { useForm, Controller } from "react-hook-form"

import { Button, TextInput } from "@mantine/core"
import { useRouter } from "next/navigation";

type ViewProps = {
  playerId?: string,
}

interface FormInputs {
  id: number
  name: string
}

export function PlayerForm({playerId}: ViewProps) {
  
  const router = useRouter()
  const {
    getPlayerForm,
    savePlayer,
  } = useDataState()
  const player = getPlayerForm(playerId)
  
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: player,
  })
  const handleLocalSubmit = (data: FormInputs) => {
    try {
      const result = savePlayer({...data, id: player.id})
      router.push(`/app/player/${result.id}/`)
    } catch(e) {
      console.log(e)
      return
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLocalSubmit)}>
      <Controller
        name="id"
        disabled
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextInput {...field} label="ID" />}
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
