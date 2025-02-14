'use client'

import { useEffect, useState } from "react";
import { ViewDataOptions, ViewState } from "./types";
import { fetchData } from "./fetchData";
import { NiceLoading } from "../loading";
import { AuthCTA } from "@/views/AuthCTA";
import { NiceError } from "../error";
import { useClientAuth } from "@/state/auth/useClientAuth";

// XXX this is required
// NextJS SSG requires paths be specified at build. We create dummy pages with "xxx" as the ID
// Firebase hosting can rewrite generic paths to a handler (eg /player/[playerId]/ to /player/xxx/)
// NextJS gives the client the URL parameter, but it's dummy xxx ID not the live ID
function buildClientOptions(viewOptions: ViewDataOptions) {
  const options = {...viewOptions}
    
  if(viewOptions.game) {
    options.game = location.pathname.split('/')[2]
  }
  if(viewOptions.campaign) {
    options.campaign = location.pathname.split('/')[2]
  }
  if(viewOptions.player) {
    options.player = location.pathname.split('/')[2]
  }
  if(viewOptions.session) {
    options.session = location.pathname.split('/')[2]
  }
  if(viewOptions.sessions) {
    options.sessions = location.pathname.split('/')[2]
  }
  if(viewOptions.sessionId) {
    options.sessionId = location.pathname.split('/')[2]
  }

  return options
}

export function useViewState(viewState: ViewState) {
  const {options} = viewState

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
        const options = buildClientOptions(viewState.options)
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