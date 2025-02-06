import getAuthState from "@/state/auth/getAuthState"

import { AuthCTA } from "@/views/AuthCTA"
import { NiceError } from "@/components/error"
import { fetchData } from "./fetchData"
import { ViewData, ViewDataOptions, ViewMeta, ViewState } from "./types"
import { NiceLoading } from "../loading"

const SERVER_DATA_ENABLED = false

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

    // XXX SSR data loading disabled
    if(!interstitial && SERVER_DATA_ENABLED) {
      data = await fetchData(options)
      meta.isDataReady = true
    } else {
      interstitial = <NiceLoading />
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