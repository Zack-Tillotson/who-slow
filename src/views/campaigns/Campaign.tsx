'use client'

import { useDataState } from "@/state";
import { Box, Button, Divider, Group, Pill, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { Session } from "../sessions";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import { Campaign as CampaignType, Session as SessionType} from "@/state/types";

type CampaignViewProps = {
  campaignId: string,
  campaign: CampaignType | null,
  sessions: SessionType[],
}

export function Campaign({campaignId, campaign, sessions}: CampaignViewProps) {

  if(!campaign) {
    return (
      <h1>Error: campaign not found</h1>
    )
  }
    
  return (
    <>
      <Group mb="lg">
        <Stack flex={1} gap="0">
          <Text size="xs">Campaign</Text>
          <Title order={1} size="lg" flex={1}>{campaign.name || `"Just play" sessions`}</Title>
        </Stack>
        <Button
          component={Link}
          href={`/campaign/${campaignId}/edit`}
          variant="outline"
          leftSection={<IconPencil size="1rem" stroke={1.5} />}
        >
          Edit
        </Button>
      </Group>
      <Divider />
      <Group mt="lg">
        <Title order={2} flex={1} size="md">Play sessions</Title>
        <Button
          component={Link}
          href={`/session/new/?campaignId=${campaignId}`}
          leftSection={<IconPlus size="1rem" stroke={1.5} />}
        >
          New
        </Button>
      </Group>
      <Text size="sm">Create a session to record when you play a game, sessions keep track of which game you played and who the players are.</Text>
      {!sessions.length && (
        <Text>No sessions yet</Text>
      )}
      {[...sessions].reverse().map((session) => (
        <Session key={session.id} sessionId={`${session.id}`} />
      ))}
    </>
  )
}