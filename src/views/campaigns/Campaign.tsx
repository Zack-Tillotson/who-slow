'use client'

import { useDataState } from "@/state";
import { Box, Button, Text, Title } from "@mantine/core";
import Link from "next/link";

type CampaignViewProps = {
  campaignId: string,
}

export function Campaign({campaignId}: CampaignViewProps) {

  const {
    getCampaign,
    getCampaignSessions,
  } = useDataState()
  const campaign = getCampaign(campaignId)

  if(!campaign) {
    return (
      <h1>Error: campaign not found</h1>
    )
  }

  const {id, name} = campaign
  const sessions = getCampaignSessions(id)
    
  return (
    <>
      <Box>
        {!id && (
          <>
            <Title order={1}>{`Default campaign - "just play" sessions`}</Title>
            <Button component={Link} href={`edit/`}>Edit</Button>
          </>
        )}
        {!!id && (
          <>
            <Title order={1}>Campaign: {name}</Title>
            <Button component={Link} href={`edit/`}>Edit</Button>
          </>
        )}
      </Box>
      <Box>
        <Title order={2}>Sessions</Title>
        <Button component={Link} href={`/app/session/new/?campaign=${campaignId}`}>New</Button>
        {!sessions.length && (
          <Text>No sessions yet</Text>
        )}
        {sessions.map((session, index) => (
          <div key={session.id}>
            <Title order={3}>Session {index + 1}.</Title>
            <Text>{session.date.toLocaleDateString()}</Text>
            <Text>Playing {session.game}</Text>
          </div>
        ))}
      </Box>
    </>
  )
}