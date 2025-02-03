'use client'

import { Player } from "@/state/types";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

type PlayersParams = {
  players?: Player[],
}

export function Players({players = []}: PlayersParams) {
  
  return (
    <>
      <Group>
        <Title order={1} flex="1">Players</Title>
        <Button
          component={Link}
          href={`/player/new/`}
          leftSection={<IconPlus size="1rem" stroke={1.5} />}
        >
          New
        </Button>
      </Group>
      
      {players.map(({id, name}) => (
        <Group key={id} p="sm">
          <Stack flex={1} gap="0">
            <Text size="xs">Player</Text>
            <Title order={2} size="lg">{name}</Title>
          </Stack>
          <Button
            component={Link}
            href={`/player/${id}/`}
            variant="outline"
          >
            View
          </Button>
        </Group>
      ))}
    </>
  )
}