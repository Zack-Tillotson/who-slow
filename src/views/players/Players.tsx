'use client'

import { useDataState } from "@/state";
import { Button, Text, Title } from "@mantine/core";
import Link from "next/link";

export function Players() {

  const {
    getPlayers,
  } = useDataState()

  const players = getPlayers()
  
  return (
    <>
      <Button component={Link} href={`/app/player/new/`}>New</Button>
      <Title order={1}>Player list</Title>
      
      {players.map(({id, name}) => (
        <div key={id}>
          <Title order={2}>{name}</Title>
          <Button component={Link} href={`/app/player/${id}/`}>View</Button>
        </div>
      ))}
    </>
  )
}