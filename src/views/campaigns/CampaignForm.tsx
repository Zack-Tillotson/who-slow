'use client'

import { useDataState } from "@/state";
import { useForm, Controller } from "react-hook-form"

import { Button, TextInput } from "@mantine/core"
import { useRouter } from "next/navigation";

type CampaignViewProps = {
  campaignId?: string,
}

interface FormInputs {
  id: number
  name: string
}

export function CampaignForm({campaignId}: CampaignViewProps) {
  
  const router = useRouter()
  const {
    getCampaignForm,
    saveCampaign,
  } = useDataState()
  const campaign = getCampaignForm(campaignId)
  
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: campaign,
  })
  const handleLocalSubmit = (data: FormInputs) => {
    try {
      const result = saveCampaign({...data, id: campaign.id})
      router.push(`/campaign/${result.id}/`)
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
