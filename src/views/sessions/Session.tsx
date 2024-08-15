'use client'

import { useDataState } from "@/state";
import { Button, Group, Pill, Text, Title } from "@mantine/core";
import Link from "next/link";

type ViewProps = {
  sessionId: string,
}

export function Session({sessionId}: ViewProps) {

  const {
    getSession,
    getGame,
    getPlayer,
    getSessionStatusText,
  } = useDataState()
  const session = getSession(sessionId)

  if(!session) {
    return (
      <h1>Error: game not found</h1>
    )
  }

  return (
    <>
      <div>
        <Group>
          <Title order={3} flex={1}>{new Date(session.date).toLocaleDateString()}</Title>
          <Button component={Link} href={`/app/session/${session.id}/edit`} variant="subtle">Edit</Button>
          <Pill bg={session.status === 'POST' ? 'lightgreen' : ''}>{getSessionStatusText(session.status)}</Pill>
        </Group>
        <Text>Playing {getGame(session.game)?.name}</Text>
        <Text>{session.sessionPlayers.map(({player}) => (getPlayer(player)?.name ?? 'Player')).join(', ')}</Text>
      </div>
      <Button component={Link} href={`/app/session/${session.id}/play`}>Start session</Button>
    </>
  )
}