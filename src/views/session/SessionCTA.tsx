'use client'

import { NavLinks } from "@/components/navLinks";
import { Button, Stack, Title } from "@mantine/core";
import Link from "next/link";

export function SessionCTA() {
  return (
    <Stack>
      <Title order={2} size="md" mt="lg">Setup a campaign</Title>
      <NavLinks />
      <Title order={2} size="md" mt="lg">Or just jump in</Title>
      <Button component={Link} href="/session/share/">Join shared session</Button>
    </Stack>
  )
}