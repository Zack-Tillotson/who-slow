import { library } from "@/state/remote"
import { ViewData, ViewDataOptions } from "./types"

export async function fetchData(params: ViewDataOptions) {

  const data: ViewData = {}
  if(params.game) {
    data.game = await library().getGame(params.game)
  }
  if(params.games) {
    data.games = await library().getGames()
  }
  if(params.campaign) {
    data.campaign = await library().getCampaign(params.campaign)
  }
  if(params.campaigns) {
    data.campaigns = await library().getCampaigns()
  }
  if(params.player) {
    data.player = await library().getPlayer(params.player)
  }
  if(params.players) {
    data.players = await library().getPlayers()
  }
  if(params.session) {
    data.session = await library().getFilledSession(params.session)
  }
  if(params.sessions) {
    data.sessions = await library().getCampaignSessions(params.sessions)
  }
  if(params.sessionId) {
    data.sessionId = await library().getSessionIdFromShareCode(params.sessionId)
  }
  
  return data
}
