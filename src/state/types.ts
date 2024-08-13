export type Game = {
  bggId: number,
}

export type Player = {
  id: number,
  name: string,
}

export type Campaign = {
  id: number,
  name: string,
}

export type SessionPlayer = {
  player: Player["id"],
  order: number,
  color: string,
}

export type Session = {
  data: Date,
  status: 'PRE'|'IN'|'PAUSE'|'POST',
  campaign: Campaign["id"],
  game: Game["bggId"],
  sessionPlayers: SessionPlayer[],
}

export type DataState = {
  games: Game[],
  players: Player[],
  campaigns: Campaign[],
  sessions: Session[],

  isInitialized: Boolean,
  isLoading: Boolean,
  isError: Boolean,

  getCampaign: (stringId: string) => Campaign | undefined,
  getCampaigns: () => Campaign[],
  saveCampaign: (campaign: Campaign) => Campaign,
  getCampaignForm: (stringId?: string) => Campaign,

  getGame: (stringId: string) => Game | undefined,
  getGames: () => Game[],
  saveGame: (game: Game) => Game,
  getGameForm: (stringId?: string) => Game,

  getPlayer: (stringId: string) => Player | undefined,
  getPlayers: () => Player[],
  savePlayer: (player: Player) => Player,
  getPlayerForm: (stringId?: string) => Player,
}