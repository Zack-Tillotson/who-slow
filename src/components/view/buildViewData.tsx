import getAuthState from "@/state/getAuthState"

import { AuthCTA } from "@/views/AuthCTA"
import { NiceError } from "@/components/error"
import { fetchData } from "./fetchData"
import { ViewData, ViewDataOptions, ViewMeta, ViewState } from "./types"

export async function buildViewData(options: ViewDataOptions = {}): Promise<ViewState> {
  let interstitial = undefined
  let data: ViewData = {}
  const meta: ViewMeta = {
    isSSR: true,
    isCSR: false,
    isLoading: false,
    isDataReady: false,
    isError: false,
  }

  try {

    const auth = await getAuthState()
    if(!auth.currentUser) {
      interstitial = <AuthCTA />
    }

    if(!interstitial && false) {
      data = await fetchData(options)
      meta.isDataReady = true
    }

  } catch(e) {
    interstitial = <NiceError />
    meta.isError = true
  }
  
  return {
    interstitial,
    options,
    data,
    meta,
  }
}