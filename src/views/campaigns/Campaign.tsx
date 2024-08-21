'use client'

import { useDataState } from "@/state";
import { Box, Button, Group, Pill, Text, Title } from "@mantine/core";
import Link from "next/link";
import { Session } from "../sessions";

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
        <Group>
          <Title order={2} flex={1}>Sessions</Title>
          <Button component={Link} href={`/app/session/new/?campaign=${campaignId}`}>New</Button>
        </Group>
        {!sessions.length && (
          <Text>No sessions yet</Text>
        )}
        {sessions.map((session) => (
          <Session key={session.id} sessionId={`${session.id}`} />
        ))}
      </Box>
    </>
  )
}