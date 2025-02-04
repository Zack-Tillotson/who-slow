'use client'

import { NiceLoading } from "@/components/loading";
import { ViewParams } from "@/components/view/types";
import { SessionCard } from "./components/SessionCard";


export function Session({viewState}: ViewParams) {

  const {
    data: {session: filledSession},
    meta: {isDataReady},
  } = viewState

  if(!isDataReady) {
    return <NiceLoading />
  }

  return <SessionCard filledSession={filledSession} />
}