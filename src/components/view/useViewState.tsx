'use client'

import { useEffect, useState } from "react";
import { ViewDataOptions, ViewState } from "./types";
import { fetchData } from "./fetchData";
import { NiceLoading } from "../loading";
import { AuthCTA } from "@/views/AuthCTA";
import { NiceError } from "../error";
import { useClientAuth } from "@/state/auth/useClientAuth";
import { useClientOptions } from "./useClientOptions";

export function useViewState(viewState: ViewState) {
  const options = useClientOptions(viewState.options)
  const [data, updateData] = useState(viewState.data)
  const [meta, updateMeta] = useState(viewState.meta)
  const [interstitial, updateInterstitial] = useState(viewState.interstitial)
  const auth = useClientAuth()

  const {isDataReady} = meta
  
  useEffect(() => {
    if(!isDataReady) {
      updateMeta(meta => ({...meta, isCSR: true, isSSR: false, isLoading: true}))
    }
  }, [isDataReady])

  useEffect(() => {
    if(!isDataReady && !auth.isLoading) {
      if(!auth.isAuthenticated) {
        updateInterstitial(<AuthCTA />)
      } else {
        updateInterstitial(<NiceLoading />)
        fetchData(options)
          .then(data => {
            updateData(data)
            updateInterstitial(undefined)
            updateMeta(meta => ({...meta, isLoading: false, isDataReady: true}))
          }).catch(error => {
            updateInterstitial(<NiceError />)
            console.log('ERROR', 'Unable to load data', error)
          })
      }
    }
  }, [isDataReady, auth.isLoading, auth.isAuthenticated, viewState.options])

  return {data, meta, interstitial, options}
}