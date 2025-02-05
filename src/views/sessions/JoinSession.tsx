'use client'

import { NiceLoading } from "@/components/loading";
import { ViewParams } from "@/components/view/types";
import { JoinSessionForm } from "./joinSessionForm";

export function JoinSession({viewState}: ViewParams) {

  const {
    meta: {isDataReady},
  } = viewState

  if(!isDataReady) {
    return <NiceLoading />
  }

  return <JoinSessionForm />
}