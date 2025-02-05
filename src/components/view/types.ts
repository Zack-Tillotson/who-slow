import { Game, Campaign, Player, Session, FilledSession } from "@/state/types";
import { JSX } from "react";

export interface ViewDataOptions {
  game?: Game["id"]
  games?: true
  campaign?: Campaign["id"]
  campaigns?: true
  player?: Player["id"]
  players?: true
  session?: Session["id"]
  sessions?: Campaign["id"]
  sessionId?: string
}export interface ViewData {
  game?: Game
  games?: Game[]
  campaign?: Campaign
  campaigns?: Campaign[]
  player?: Player
  players?: Player[]
  session?: FilledSession
  sessions?: FilledSession[]
  sessionId?: string
}
export interface ViewMeta {
  isSSR: boolean
  isCSR: boolean
  isLoading: boolean
  isDataReady: boolean
  isError: boolean
}
export interface ViewState {
  interstitial: JSX.Element | undefined
  options: ViewDataOptions
  data: ViewData
  meta: ViewMeta
}
export interface ViewParams {
  viewState: ViewState,
}
