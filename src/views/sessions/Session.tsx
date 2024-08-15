'use client'

import { useDataState } from "@/state";
import { Button, Text, Title } from "@mantine/core";
import Link from "next/link";

type ViewProps = {
  sessionId: string,
}

export function Session({sessionId}: ViewProps) {

  const {
    getSession,
  } = useDataState()
  const session = getSession(sessionId)

  if(!session) {
    return (
      <h1>Error: game not found</h1>
    )
  }

  const {id} = session

  return (
    <>
      <Title order={1}>Session: #{id}</Title>
      <Button component={Link} href={`edit/`}>Edit</Button>
    </>
  )
}