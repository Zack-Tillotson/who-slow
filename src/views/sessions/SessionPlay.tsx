'use client'

import { useDataState } from "@/state";
import { Button, SimpleGrid, Group, Stack, Text } from "@mantine/core"

type ViewProps = {
  sessionId: string,
}

export function SessionPlay({sessionId}: ViewProps) {

  const {
    getSession,
    getGame,
    getPlayer,
    getSessionStatusText,
  } = useDataState()
  const session = getSession(sessionId)

  if(!session) {
    return (
      <h1>Error: session not found</h1>
    )
  }

  const {events, sessionPlayers} = session

  return (
    <>
      <Stack>
        {!events?.length && (<Text>Click player name to start</Text>)}
        <div>00:00</div>
        <Group gap="xs">
          <Button p="xs" m="0" fz="xs">End</Button>
          <Button p="xs" m="0" fz="xs">Pause</Button>
          <Button p="xs" m="0" fz="xs">Undo</Button>
          <Button p="xs" m="0" fz="xs">Fix turn</Button>
        </Group>
      </Stack>
      <SimpleGrid>
        {sessionPlayers.map(({player, color}) => (
          <Button key={player} bg={color}>{player}</Button>
        ))}
      </SimpleGrid>
    </>
  )
}