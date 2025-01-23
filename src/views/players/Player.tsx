'use client'

import { Button, Text, Title } from "@mantine/core";
import { Player as PlayerType } from "@/state/types";
import Link from "next/link";

type ViewProps = {
  playerId: string,
  player: PlayerType,
}

export function Player({playerId, player}: ViewProps) {

  if(!player) {
    return (
      <h1>Error: player not found</h1>
    )
  }

  const {id, name} = player

  return (
    <>
      <Title order={1}>Player</Title>
      <Text>Name: {name}</Text>
      <Button component={Link} href={`edit/`}>Edit</Button>
    </>
  )
}