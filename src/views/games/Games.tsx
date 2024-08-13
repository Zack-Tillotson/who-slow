'use client'

import { useDataState } from "@/state";
import { Button, Title } from "@mantine/core";
import Link from "next/link";

export function Games() {

  const {
    getGames,
  } = useDataState()

  const games = getGames()
  
  return (
    <>
      <Button component={Link} href={`/app/game/new/`}>New</Button>
      <Title order={1}>Games list</Title>
      
      {games.map(({bggId}) => (
        <div key={bggId}>
          <Title order={2}>{bggId}</Title>
          <Button component={Link} href={`/app/game/${bggId}/`}>View</Button>
        </div>
      ))}
    </>
  )
}