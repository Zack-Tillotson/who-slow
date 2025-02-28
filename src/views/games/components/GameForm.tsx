'use client'

import { useDataState } from "@/state";
import { useForm, Controller } from "react-hook-form"

import { Button, Text, TextInput, Title } from "@mantine/core"
import { useRouter } from "next/navigation";
import { BGG_GAME } from "./bggSafeAttrs";
import { GameAutocomplete } from "./GameAutocomplete"
import { Game } from "@/state/types";
import { useState } from "react";
import { library } from "@/state/remote";
import { buildCsrRouteFromHref } from "@/components/view/buildRouteLink";

type ViewProps = {
  gameId?: string,
  game?: Game,
}

interface FormInputs {
  id: string
  name: string
  image: string
  yearPublished: number
}

const enum formStates {
  CLEAN,
  PENDING,
  SUCCESS,
  ERROR,  
}

export function GameForm({gameId, game}: ViewProps) {
  
  const router = useRouter()
  const {
    getGameForm,
  } = useDataState()
  
  const defaultValues = getGameForm(game)

  const { handleSubmit, control, getValues, setValue } = useForm<FormInputs>({
    defaultValues,
  })

  const handleLoadAttrs = (attrs: BGG_GAME) => {
    setValue('id', `${attrs.bggId}`)
    setValue('name', attrs.name)
    setValue('image', attrs.image)
    setValue('yearPublished', attrs.yearPublished)
  }

  const [formState, updateFormState] = useState<formStates>(formStates.CLEAN)
  const handleLocalSubmit = async (data: FormInputs) => {
    updateFormState(formStates.PENDING)
    try {
      const result = await library().saveGame(data)
      router.push(buildCsrRouteFromHref(`/game/${result.id}/`))
      updateFormState(formStates.SUCCESS)
    } catch (e) {
      console.log('WARN', 'form submission failed', e)
      updateFormState(formStates.ERROR)
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
          name="id"
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
      <Button type="submit" mt="lg">Submit</Button>
      <Text>{formState === formStates.PENDING && 'Pending'}</Text>
      <Text>{formState === formStates.ERROR && 'Error'}</Text>
    </form>
  )
}
