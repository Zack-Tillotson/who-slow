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

export type SessionEvent = {
  type: 'TURN_START'|'END'|'PAUSE', 
  who?: Player["id"],
  when: number,
}

export type Session = {
  id: number,
  date: number,
  campaign: Campaign["id"],
  game: Game["bggId"],
  sessionPlayers: SessionPlayer[],
  events: SessionEvent[],
}

export type SessionForm = {
  id: number,
  campaign: Campaign["id"],
  game: Game["bggId"],
  players: {
    player: Player["name"],
    color: SessionPlayer["color"],
  }[],
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
  getPlayers: (targetPlayers?: SessionPlayer[]) => Player[],
  savePlayer: (player: Player) => Player,
  getPlayerForm: (stringId?: string) => Player,

  getSession: (stringId: string|number) => Session | undefined,
  getSessions: () => Session[],
  saveSession: (session: Session) => Session,
  getSessionForm: (stringId?: string, campaignId?: string) => SessionForm,
  saveSessionForm: (data: SessionForm) => Session,
  getSessionStatus: (session: Session) => string,
  getSessionStatusText: (session: Session) => string,
  setSessionEvents: (session: Session, events: SessionEvent[]) => Session,
  pushSessionEvent: (session: Session, event: SessionEvent) => Session,
  popSessionEvent: (session: Session, popCount?: number) => Session,
}