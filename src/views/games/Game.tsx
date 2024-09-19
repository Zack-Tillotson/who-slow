'use client'

import { useDataState } from "@/state";
import { Alert, Button, Image, Text, Title } from "@mantine/core";
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

  const {name, bggId, yearPublished, image} = game

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
      <Text>Year: {yearPublished}</Text>
      <Text>BGG Id: #{bggId}</Text>
      <Image src={image} alt={`${name} box art`} />
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