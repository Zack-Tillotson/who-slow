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
      router.push(`/app/campaign/${result.id}/`)
    } catch(e) {
      console.log(e)
      return
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLocalSubmit)}>
      <table>
        <thead>
          <tr>
            <td>Field</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>ID</td>
            <td>
              <Controller
                name="id"
                disabled
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextInput {...field} />}
              />
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextInput {...field} />}
              />
            </td>
          </tr>
        </tbody>
      </table>
      
      <Button type="submit">Submit</Button>
    </form>
  )
}
