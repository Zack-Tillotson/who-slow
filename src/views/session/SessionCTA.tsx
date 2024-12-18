'use client'

import { NavLinks } from "@/components/navLinks";
import { useDataState } from "@/state";
import { Button, Card, NavLink, Stack, Title } from "@mantine/core";
import Link from "next/link";

export function SessionCTA() {
  return (
    <Stack>
      <Title order={2} size="md" mt="lg">Setup a campaign</Title>
      <NavLinks />
      <Title order={2} size="md" mt="lg">Or just jump in</Title>
      <Button component={Link} href="/session/new/?campaignId=0">New Session</Button>
    </Stack>
  )
}