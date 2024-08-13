'use client'

import { useDataState } from "@/state";
import { Button, Text, Title } from "@mantine/core";
import Link from "next/link";

type ViewProps = {
  gameId: string,
}

export function Game({gameId}: ViewProps) {

  const {
    getGame,
  } = useDataState()
  const game = getGame(gameId)

  if(!game) {
    return (
      <h1>Error: game not found</h1>
    )
  }

  const {bggId} = game

  return (
    <>
      <Title order={1}>Game: #{bggId}</Title>
      <Button component={Link} href={`edit/`}>Edit</Button>
    </>
  )
}