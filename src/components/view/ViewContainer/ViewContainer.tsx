'use client'

import { FC } from "react"
import { ViewState } from "../types";

import { Footer } from "../footer"
import { useViewState } from "../useViewState";

export interface ViewContainerParams {
  viewState: ViewState,
  View: FC<{viewState: ViewState}>,
}

export function ViewContainer({viewState, View}: ViewContainerParams) {
  const clientState = useViewState(viewState)

  return (
    <section>
      {clientState.interstitial}
      {!clientState.interstitial && <View viewState={clientState} />}
      <Footer {...clientState} />
    </section>
  );
}
