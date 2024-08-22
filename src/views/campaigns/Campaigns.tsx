'use client'

import { useDataState } from "@/state";
import { Button, Text, Title } from "@mantine/core";
import Link from "next/link";

export function Campaigns() {

  const {
    getCampaigns,
  } = useDataState()

  const campaigns = getCampaigns()
  
  return (
    <>
      <Button component={Link} href={`/campaign/new/`}>New</Button>
      <Title order={1}>Campaign list</Title>
      
      {campaigns.map(({id, name}) => (
        <div key={id}>
          <Title order={2}>{name}</Title>
          <Button component={Link} href={`/campaign/${id}/`}>View</Button>
        </div>
      ))}
    </>
  )
}