import getAuthState from "@/state/auth/getAuthState"

import { AuthCTA } from "@/views/AuthCTA"
import { NiceError } from "@/components/error"
import { fetchData } from "./fetchData"
import { ViewDataOptions, ViewState } from "./types"
import { NiceLoading } from "../loading"
import { viewStateFactory } from "./viewStateFactory"
import { IS_STATIC } from "@/navLinks"

export async function buildViewData(options: ViewDataOptions = {}): Promise<ViewState> {
  const viewState: ViewState = viewStateFactory(options)
  
  try {

      const auth = await getAuthState()
      if(!auth.currentUser) {
        viewState.interstitial = <AuthCTA />
      }

      if(IS_STATIC) {
        viewState.interstitial = <NiceLoading />
      }
      
      if(!viewState.interstitial) {
        viewState.data = await fetchData(options)
        viewState.meta.isDataReady = true
      }
  } catch(e) {
    viewState.interstitial = <NiceError />
    viewState.meta.isError = true
  }
  
  return viewState
}