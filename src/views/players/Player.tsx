'use client'

import { Button, Text, Title } from "@mantine/core";
import Link from "next/link";
import { ViewParams } from "@/components/view/types";

export function Player({viewState}: ViewParams) {
  
  const {data: {player}} = viewState

  if(!player) {
    return (
      <h1>Error: player not found</h1>
    )
  }

  const {name} = player

  return (
    <>
      <Title order={1}>Player</Title>
      <Text>Name: {name}</Text>
      <Button component={Link} href={`edit/`}>Edit</Button>
    </>
  )
}