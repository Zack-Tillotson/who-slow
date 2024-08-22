'use client'

import { useDataState } from "@/state";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export function Games() {

  const {
    getGames,
  } = useDataState()

  const games = getGames()
  
  return (
    <>
      <Group>
        <Title order={1} flex="1">Games</Title>
        <Button
          component={Link}
          href={`/game/new/`}
          leftSection={<IconPlus size="1rem" stroke={1.5} />}
        >
          New
        </Button>
      </Group>
      
      {games.map(({bggId, name}) => (
        <Group key={bggId} p="sm">
          <Stack flex={1} gap="0">
            <Text size="xs">Game</Text>
            <Title order={2} size="lg">{name}</Title>
          </Stack>
          <Button
            component={Link}
            href={`/game/${bggId}/`}
            variant="outline"
          >
            View
          </Button>
        </Group>
      ))}
    </>
  )
}