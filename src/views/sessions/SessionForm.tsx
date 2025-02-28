'use client'

import { NiceLoading } from "@/components/loading"
import { ViewParams } from "@/components/view/types"
import {SessionForm as FormSession} from './components/SessionForm'

export function SessionForm({viewState}: ViewParams) {  const {
    options: {session: sessionId}, 
    data: {session, games, players, campaigns},
    meta: {isDataReady},
  } = viewState

  if(!isDataReady) {
    return <NiceLoading />
  }

  return (
    <FormSession
      sessionId={sessionId}
      session={session?.session}
      games={games}
      campaigns={campaigns}
      players={players}
    />
  )
}
