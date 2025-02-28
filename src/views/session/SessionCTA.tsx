'use client'

import { NavLinks } from "@/components/navLinks";
import { RouteLink } from "@/components/routeLink";
import { Button, Stack, Title } from "@mantine/core";

export function SessionCTA() {
  return (
    <Stack>
      <Title order={2} size="md" mt="lg">Setup a campaign</Title>
      <NavLinks />
      <Title order={2} size="md" mt="lg">Or just jump in</Title>
      <Button component={RouteLink} href="/session/share/">Join shared session</Button>
    </Stack>
  )
}