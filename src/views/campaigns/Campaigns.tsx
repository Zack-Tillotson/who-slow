'use client'

import { ViewParams } from "@/components/view/types"
import { Button, Group, Stack, Text, Title } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import Link from "next/link"

export function Campaigns({viewState}: ViewParams) {
  
  const {data: {campaigns = []}} = viewState

  return (
    <>
      <Group>
        <Title order={1} flex="1">Campaigns</Title>
        <Button
          component={Link}
          href={`/campaign/new/`}
          leftSection={<IconPlus size="1rem" stroke={1.5} />}
        >
          New
        </Button>
      </Group>
      {campaigns.map(({id, name}) => (
        <Group key={id} p="sm">
          <Stack flex={1} gap="0">
            <Text size="xs">Campaign</Text>
            <Title order={2} size="lg">{name}</Title>
          </Stack>
          <Button
            component={Link}
            href={`/campaign/${id}/`}
            variant="outline"
          >
            View
          </Button>
        </Group>
      ))}
    </>
  )
}