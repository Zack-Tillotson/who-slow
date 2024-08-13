'use client'

import { useDataState } from "@/state";
import { Button, Title } from "@mantine/core";
import Link from "next/link";

type ViewProps = {
  playerId: string,
}

export function Player({playerId}: ViewProps) {

  const {
    getPlayer,
  } = useDataState()
  const player = getPlayer(playerId)

  if(!player) {
    return (
      <h1>Error: player not found</h1>
    )
  }

  const {id, name} = player

  return (
    <>
      <Title order={1}>Player: {name}</Title>
      <Button component={Link} href={`edit/`}>Edit</Button>
    </>
  )
}