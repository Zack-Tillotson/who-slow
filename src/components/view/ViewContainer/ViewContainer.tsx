'use client'

import { FC } from "react"
import { ViewState } from "../types";

import { Footer } from "../footer"
import { useViewState } from "../useViewState";

export interface ViewParams {
  [key: string]: any
}

export interface ViewContainerParams {
  viewState: ViewState,
  View: FC<{viewState: ViewState & ViewParams}>,
  viewParams?: ViewParams
}

export function ViewContainer({viewState, View, viewParams = {}}: ViewContainerParams) {
  const clientState = useViewState(viewState)

  return (
    <section>
      {clientState.interstitial}
      {!clientState.interstitial && <View viewState={clientState} {...viewParams} />}
      <Footer {...clientState} />
    </section>
  );
}
