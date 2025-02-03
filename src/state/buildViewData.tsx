import { AuthCTA } from "@/views/AuthCTA"
import getAuthState from "./getAuthState"
import { library } from "./remote"
import { Campaign, FilledSession, Game, Player, Session } from "./types"
import { NiceError } from "@/components/error"
import { Auth } from "firebase/auth"

interface ViewDataOptions {
  game?: Game["id"],
  games?: null,
  campaign?: Campaign["id"],
  campaigns?: null,
  player?: Player["id"],
  players?: null,
  session?: Session["id"],
  sessions?: Campaign["id"],
  sessionId?: string,
}

interface ViewData {
  game?: Game,
  games?: Game[],
  campaign?: Campaign,
  campaigns?: Campaign[],
  player?: Player,
  players?: Player[],
  session?: FilledSession,
  sessions?: FilledSession[],
  sessionId?: string,
}

async function fetchData(params: ViewDataOptions) {
  const data: ViewData = {}
  if(params.game) {
    data.game = await library().getGame(params.game)
  }
  if('games' in params) {
    data.games = await library().getGames()
  }
  if(params.campaign) {
    data.campaign = await library().getCampaign(params.campaign)
  }
  if('campaigns' in params) {
    data.campaigns = await library().getCampaigns()
  }
  if(params.player) {
    data.player = await library().getPlayer(params.player)
  }
  if('players' in params) {
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

export async function buildViewData(params: ViewDataOptions = {}) {
  let auth: Auth | undefined = undefined
  let interstitial = undefined
  let data: ViewData = {}

  try {

    auth = await getAuthState()
    if(!auth.currentUser) {
      interstitial = <AuthCTA />
    }

    if(!interstitial) {
      data = await fetchData(params)
    }

  } catch(e) {
    interstitial = <NiceError />
  }
  
  return {
    interstitial,
    data,
    auth,
  }
}