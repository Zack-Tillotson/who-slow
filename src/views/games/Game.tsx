'use client'

import Link from "next/link";
import { Button, Image, Text, Title } from "@mantine/core";
import { ViewParams } from "@/components/view/types";
import styles from './game.module.scss'

export function Game({viewState}: ViewParams) {
  
  const {data: {game}} = viewState

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
      <Image className={styles.gameImage} src={image} alt={`${name} box art`} height={340} width={340} />
      <Button component={Link} href={`edit/`}>Edit</Button>
    </>
  )
}