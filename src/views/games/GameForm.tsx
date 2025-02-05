'use client'

import { ViewParams } from "@/components/view/types";
import { NiceLoading } from "@/components/loading";
import { GameForm as Form } from "./components/GameForm";

export function GameForm({viewState}: ViewParams) {

  const {
    options: {game: gameId}, 
    data: {game},
    meta: {isDataReady},
  } = viewState

  if(!isDataReady) {
    return <NiceLoading />
  }

  return <Form gameId={gameId} game={game} />
}
