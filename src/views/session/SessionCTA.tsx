'use client'

import { Button, Card, Title } from "@mantine/core";
import Link from "next/link";

export function SessionCTA() {

  return (
    <Card>
      <Title order={2}>Start game session</Title>
      <Button component={Link} href="/app/session/new/?campaignId=0">New</Button>
    </Card>
  )
}