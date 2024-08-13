'use client'

import { useDataState } from "@/state";
import { Button, Text, Title } from "@mantine/core";
import Link from "next/link";

type CampaignViewProps = {
  campaignId: string,
}

export function Campaign({campaignId}: CampaignViewProps) {

  const {
    getCampaign,
  } = useDataState()
  const campaign = getCampaign(campaignId)

  if(!campaign) {
    return (
      <h1>Error: campaign not found</h1>
    )
  }

  const {id, name} = campaign

  if(!id) {
    return (
      <>
        <Title order={1}>{`Default campaign - "just play" sessions`}</Title>
        <Button component={Link} href={`edit/`}>Edit</Button>
      </>
    )
  }
  
  return (
    <>
      <Title order={1}>Campaign: {name}</Title>
      <Button component={Link} href={`edit/`}>Edit</Button>
    </>
  )
}