'use client'

import { useDataState } from "@/state";
import { useForm, Controller } from "react-hook-form"

import { Button, TextInput, Title } from "@mantine/core"
import { useRouter } from "next/navigation";
import { BGG_GAME } from "./bggSafeAttrs";
import { GameAutocomplete } from "./GameAutocomplete";

type ViewProps = {
  gameId?: string,
}

interface FormInputs {
  bggId: number
  name: string
  image: string
  yearPublished: number
}

export function GameForm({gameId}: ViewProps) {
  
  const router = useRouter()
  const {
    getGameForm,
    saveGame,
  } = useDataState()
  const game = getGameForm(gameId)  
  const { handleSubmit, control, getValues, setValue } = useForm<FormInputs>({
    defaultValues: game,
  })

  const handleLoadAttrs = (attrs: BGG_GAME) => {
    setValue('bggId', attrs.bggId)
    setValue('name', attrs.name)
    setValue('image', attrs.image)
    setValue('yearPublished', attrs.yearPublished)
  }

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
      <section>
        <Title order={2}>Name</Title>
        <GameAutocomplete onSelect={handleLoadAttrs} />
      </section>
      <section>
        <Title order={2}>BGG Attributes</Title>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextInput {...field} label="Name" />}
        />
        <Controller
          name="bggId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextInput {...field} label="BGG ID" />}
        />
        <Controller
          name="yearPublished"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextInput {...field} label="Year Published" />}
        />
        <Controller
          name="image"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextInput {...field} label="Image" />}
        />
      </section>
      <Button type="submit" mt="lg" disabled={!getValues().bggId}>Submit</Button>
    </form>
  )
}
