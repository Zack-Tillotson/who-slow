'use client'

import { NavLinks } from "@/components/navLinks";
import { useDataState } from "@/state";
import { Button, Card, NavLink, Stack, Title } from "@mantine/core";
import Link from "next/link";

export function SessionCTA() {

  const {getCampaigns, getGames, } = useDataState()

  return (
    <Stack>
      <NavLinks />
      <Button component={Link} href="/session/new/?campaignId=0">New Session</Button>
    </Stack>
  )
}