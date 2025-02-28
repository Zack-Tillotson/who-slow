'use client'

import { useDataState } from "@/state";
import { useForm, Controller } from "react-hook-form"

import { Button, Loader, TextInput, Title } from "@mantine/core"
import { useRouter } from "next/navigation";
import { Player } from "@/state/types";
import { useState } from "react";
import { library } from "@/state/remote";
import { buildCsrRouteFromHref } from "@/components/view/buildRouteLink";

type ViewProps = {
  playerId?: string,
  player?: Player,
}

interface FormInputs {
  id: string
  name: string
}

const enum formStates {
  CLEAN,
  PENDING,
  SUCCESS,
  ERROR,
}

export function PlayerForm({playerId, player}: ViewProps) {
  
  const router = useRouter()
  const {
    getPlayerForm,
  } = useDataState()
  const formPlayer = getPlayerForm(player)
  
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: formPlayer,
  })
  
  const [formState, updateFormState] = useState<formStates>(formStates.CLEAN)
  const handleLocalSubmit = async (data: FormInputs) => {
    updateFormState(formStates.PENDING)
    try {
      const result = await library().savePlayer({...data, id: formPlayer.id})
      router.push(buildCsrRouteFromHref(`/player/${result.id}/`))
      updateFormState(formStates.SUCCESS)
    } catch (e) {
      console.log('WARN', 'form submission failed', e)
      updateFormState(formStates.ERROR)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLocalSubmit)}>
      <Title order={1}>{!!player ? 'Edit' : 'New'} Player</Title>
      {!!playerId && (
        <Controller
          name="id"
          disabled
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextInput {...field} label="ID" />}
        />
      )}
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextInput {...field} label="Name" />}
      />      
      <Button type="submit" disabled={formState === formStates.PENDING}>
        Submit
        {formState === formStates.PENDING && (<Loader />)}
      </Button>    </form>
  )
}
