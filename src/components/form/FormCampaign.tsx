'use client'

import { useForm, Controller } from "react-hook-form"

import { Button, Loader, TextInput, Title } from "@mantine/core"
import { useRouter } from "next/navigation";

import { useDataState } from "@/state";
import {Campaign as CampaignType} from '@/state/types'
import { useState } from "react";
import { library } from "@/state/remote";

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
      router.push(`/campaign/${result.id}/`)
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
