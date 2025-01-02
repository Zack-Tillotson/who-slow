'use client'

import Link from "next/link";
import { Button, Image, Text, Title } from "@mantine/core";

import { Game as GameType } from "@/state/types";

import styles from './game.module.scss'


type ViewProps = {
  gameId: string,
  game?: GameType,
}

export function Game({game}: ViewProps) {

  if(!game) {
    return (
      <h1>Error: game not found</h1>
    )
  }

  const {name, id, yearPublished, image} = game

  return (
    <>
      <Title order={1}>{name}</Title>
      <Text>Year: {yearPublished}</Text>
      <Text>BGG Id: #{id}</Text>
      <Image className={styles.gameImage} src={image} alt={`${name} box art`} />
      <Button component={Link} href={`edit/`}>Edit</Button>
    </>
  )
}