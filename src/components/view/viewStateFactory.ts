import { ViewDataOptions } from "./types";

export function viewStateFactory(options: ViewDataOptions) {
  return {
    interstitial: undefined,
    options,
    data: {},
    meta: {
      isSSR: true,
      isCSR: false,
      isLoading: false,
      isDataReady: false,
      isError: false,
    },
  }
}