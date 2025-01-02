'use client'

import { useDataState } from "@/state";
import { Game } from "@/state/types";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export type GamesParams = {
  games?: Game[],
}

export function Games({games}: GamesParams) {

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
      
      {games?.map(({id, name}) => (
        <Group key={id} p="sm">
          <Stack flex={1} gap="0">
            <Text size="xs">Game</Text>
            <Title order={2} size="lg">{name}</Title>
          </Stack>
          <Button
            component={Link}
            href={`/game/${id}/`}
            variant="outline"
          >
            View
          </Button>
        </Group>
      ))}
    </>
  )
}