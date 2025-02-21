'use client'


import { useState } from "react";
import { Button, Loader, TextInput, Title } from "@mantine/core"
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form"

import { useDataState } from "@/state";
import {Campaign as CampaignType} from '@/state/types'
import { library } from "@/state/remote";
import { buildCsrRouteFromHref } from "../view/buildRouteLink";

type CampaignViewProps = {
  campaignId?: string,
  campaign?: CampaignType
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

export function FormCampaign({campaign}: CampaignViewProps) {
  
  const router = useRouter()
  const {
    getCampaignForm,
  } = useDataState()
  const formCampaign = getCampaignForm(campaign)
  
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: formCampaign,
  })
  
  const [formState, updateFormState] = useState<formStates>(formStates.CLEAN)
  const handleLocalSubmit = async (data: FormInputs) => {
    updateFormState(formStates.PENDING)
    try {
      const result = await library().saveCampaign({...data, id: formCampaign.id})
      router.push(buildCsrRouteFromHref(`/campaign/${result.id}/`))
      updateFormState(formStates.SUCCESS)
    } catch (e) {
      console.log('WARN', 'form submission failed', e)
      updateFormState(formStates.ERROR)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLocalSubmit)}>
      <Title order={1}>{!!campaign ? 'Edit' : 'New'} Campaign</Title>
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
      <Button type="submit" disabled={formState === formStates.PENDING}>
        Submit
        {formState === formStates.PENDING && (<Loader />)}
      </Button>
    </form>
  )
}
