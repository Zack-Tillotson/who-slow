'use client'

import { useEffect, useState } from "react";
import { ViewState } from "./types";
import { fetchData } from "./fetchData";
import { NiceLoading } from "../loading";
import { AuthCTA } from "@/views/AuthCTA";
import { NiceError } from "../error";
import { useClientAuth } from "@/state/auth/useClientAuth";

export function useViewState(viewState: ViewState) {
  const {options} = viewState

  const [data, updateData] = useState(viewState.data)
  const [meta, updateMeta] = useState(viewState.meta)
  const [interstitial, updateInterstitial] = useState(viewState.interstitial)
  const auth = useClientAuth()

  const {isDataReady} = meta
  
  useEffect(() => {
    if(!meta.isDataReady) {
      updateMeta({...meta, isCSR: true, isSSR: false, isLoading: true})
    }
  }, [isDataReady])

  useEffect(() => {
    if(!meta.isDataReady && !auth.isLoading) {
      if(!auth.isAuthenticated) {
        updateInterstitial(<AuthCTA />)
      } else {
        updateInterstitial(<NiceLoading />)
        fetchData(viewState.options)
          .then(data => {
            updateData(data)
            updateInterstitial(undefined)
            updateMeta({...meta, isLoading: false, isDataReady: true})
          }).catch(error => {
            updateInterstitial(<NiceError />)
            console.log('ERROR', 'Unable to load data', error)
          })
      }
    }
  }, [isDataReady, auth.isLoading, auth.isAuthenticated, viewState.options])

  return {data, meta, interstitial, options}
}