export type Game = {
  bggId: number,
  name: string,
}

export type Player = {
  id: number,
  name: string,
}

export type Campaign = {
  id: number,
  name: string,
  sessions?: Session[],
}

export type SessionPlayer = {
  id: number,
  player: Player["id"],
  order: number,
  color: string,
}

export type Session = {
  id: number,
  date: string,
  status: 'PRE'|'IN'|'PAUSE'|'POST',
  campaign: Campaign["id"],
  game: Game["bggId"],
  sessionPlayers: SessionPlayer[],
  events?: Event[],
}

export type DataState = {
  games: Game[],
  players: Player[],
  campaigns: Campaign[],
  sessions: Session[],

  isInitialized: Boolean,
  isLoading: Boolean,
  isError: Boolean,

  getCampaign: (stringId: string|number) => Campaign | undefined,
  getCampaignSessions: (campaignId: number) => Session[],
  getCampaigns: () => Campaign[],
  saveCampaign: (campaign: Campaign) => Campaign,
  getCampaignForm: (stringId?: string) => Campaign,

  getGame: (stringId: string|number) => Game | undefined,
  getGames: () => Game[],
  saveGame: (game: Game) => Game,
  removeGame: (stringId: string|number) => boolean,
  getGameForm: (stringId?: string) => Game,

  getPlayer: (stringId: string|number) => Player | undefined,
  getPlayers: () => Player[],
  savePlayer: (player: Player) => Player,
  getPlayerForm: (stringId?: string) => Player,

  getSession: (stringId: string|number) => Session | undefined,
  getSessions: () => Session[],
  saveSession: (session: Session) => Session,
  getSessionForm: (stringId?: string, campaignId?: string) => Session,
  getSessionStatusText: (status: string) => string,
}