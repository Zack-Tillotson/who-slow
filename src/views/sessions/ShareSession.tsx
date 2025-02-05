'use client'

import { NiceLoading } from "@/components/loading";
import { ViewParams } from "@/components/view/types";
import { JoinSessionForm } from "./joinSessionForm";
import { redirect } from "next/navigation";

export function ShareSession({viewState}: ViewParams) {

  const {
    options: {sessionId: shareCode},
    data: {sessionId},
    meta: {isDataReady},
  } = viewState

  if(!isDataReady) {
    return <NiceLoading />
  }

  if(!shareCode) {
    return <JoinSessionForm />
  }
  
  if(!sessionId) {
    return <JoinSessionForm isInvalidCode paramCode={shareCode} />  
  }
  
  redirect(`/session/${sessionId}/play`)
}