'use client'

import { useDataState } from "@/state";
import { Game, Player, FullSession } from "@/state/types";
import { Button, Divider, Group, Paper, Pill, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

type ViewProps = {
  sessionId: string,
  session: FullSession,
  game: Game,
  players: Player[],
}

export function Session({sessionId, session, game, players}: ViewProps) {

  if(!session) {
    return (
      <div>
        <Title order={1}>Error</Title>
        <Text>Session not found</Text>
      </div>
    )
  }

  const status = 'status'//getSessionStatusText(session)

  return (
    <Paper withBorder shadow="md" p="sm" mt="lg">
      <Group>
        <Title order={3} flex={1} size="md">Session</Title>
        {status === 'Not started' && (
          <Button component={Link} href={`/session/${session.id}/edit`} variant="subtle">Edit</Button>
        )}
        <Pill bg={status === 'Session ended' ? 'lightgreen' : ''}>{status}</Pill>
      </Group>
      <Stack gap="0">
        <Text size="xs">Date</Text>
        <Text size="xs" fw={700}>{new Date(session.date).toLocaleDateString()}</Text>
      </Stack>
      <Stack gap="0">
        <Text size="xs">Game</Text>
        <Text size="xs" fw={700}>{game?.name}</Text>
      </Stack>
      <Stack gap="0">
        <Text size="xs">Players</Text>
        <Text size="xs" fw={700}>{players.map((player) => player?.name ?? 'Player').join(', ')}</Text>
      </Stack>
      <Divider mt="sm" />
      <Group pt="md">
        <Button
          component={Link}
          href={`/session/${session.id}/play`}
          variant={status !== 'Session ended' ? "filled" : "subtle"}
        >
          Start session
        </Button>
        <Button
          component={Link}
          href={`/session/${session.id}/stats`}
          variant={status === 'Session ended' ? "filled" : "subtle"}
        >
          View stats
        </Button>
      </Group>
    </Paper>
  )
}