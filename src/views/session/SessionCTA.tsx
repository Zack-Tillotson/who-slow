'use client'

import { Button, Card, Title } from "@mantine/core";

export function SessionCTA() {

  const handleNewClick = () => console.log('new session')

  return (
    <Card>
      <Title order={2}>Start game session</Title>
      <Button onClick={handleNewClick}>New</Button>
    </Card>
  )
}