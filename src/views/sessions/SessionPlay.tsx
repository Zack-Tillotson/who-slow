'use client'

import { NiceLoading } from "@/components/loading"
import { ViewParams } from "@/components/view/types"
import {SessionPlay as PlaySession} from './components/SessionPlay'
import { NiceError } from "@/components/error"

export function SessionPlay({viewState}: ViewParams) {  const {
    options: {session: sessionId}, 
    data: {game},
    meta: {isDataReady},
  } = viewState

  if(!sessionId) {
    return <NiceError />
  }

  if(!isDataReady) {
    return <NiceLoading />
  }

  return (
    <PlaySession
      sessionId={sessionId}
      game={game}
    />
  )
}
