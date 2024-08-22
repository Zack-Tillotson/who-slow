'use client'

import { useDataState } from "@/state";
import { Alert, Button, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ViewProps = {
  gameId: string,
}

export function Game({gameId}: ViewProps) {

  const router = useRouter()
  const [error, setError] = useState('')
  const {
    getGame,
    removeGame,
  } = useDataState()
  const game = getGame(gameId)

  if(!game) {
    return (
      <h1>Error: game not found</h1>
    )
  }

  const {name, bggId} = game

  const handleDeleteClick = () => {
    const result = removeGame(gameId)
    setError('')
    if(result) {
      router.push(`/game/`)
    } else {
      setError('Unable to remove game')
    }
  }

  return (
    <>
      <Title order={1}>{name}</Title>
      <Text>BGG Id: #{bggId}</Text>
      <Button component={Link} href={`edit/`}>Edit</Button>
      <Button onClick={handleDeleteClick}>Delete</Button>
      {!!error && (
        <Alert>
          {error}
        </Alert>
      )}
    </>
  )
}