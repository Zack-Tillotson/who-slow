'use client'

import { NiceLoading } from "@/components/loading";
import { ViewParams } from "@/components/view/types";
import {PlayerForm as Form} from './components/PlayerForm'

export function PlayerForm({viewState}: ViewParams) {

  const {
    options: {game: playerId}, 
    data: {player},
    meta: {isDataReady},
  } = viewState

  if(!isDataReady) {
    return <NiceLoading />
  }

  return <Form playerId={playerId} player={player} />
}
