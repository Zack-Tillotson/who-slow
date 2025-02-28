'use client'

import { Button, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import { ViewState } from "@/components/view/types";
import { NiceLoading } from "@/components/loading";
import { SessionCard } from "../sessions/components/SessionCard";
import { RouteLink } from "@/components/routeLink";

interface ClientParams {
  viewState: ViewState,
}

export function Campaign({viewState}: ClientParams) {

  const {
    options: {campaign: campaignId}, 
    data: {campaign, sessions = []},
    meta: {isDataReady},
  } = viewState

  if(!isDataReady) {
    return <NiceLoading />
  }

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
          component={RouteLink}
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
          component={RouteLink}
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
        <SessionCard
          key={session.session.id}
          filledSession={session}
        />
        )
      )}
    </>
  )
}