export type Game = {
  id: string,
  name: string,
  yearPublished?: number,
  image?: string,
}

export type Player = {
  id: string,
  name: string,
}

export type Campaign = {
  id: string,
  name: string,
}

export type SessionPlayer = {
  player: Player["id"],
  name: Player["name"],
  color: string,
}

export type SessionEvent = {
  type: 'TURN_START'|'END'|'PAUSE', 
  who?: Player["id"],
  when: number,
}

export type Session = {
  id: string,
  date: number,
  campaign: Campaign["id"],
  game: Game["id"],
  sessionPlayers: SessionPlayer[],
  events?: SessionEvent[],
  owner: string,
}

export type SessionConfig = Pick<Session, 'id' | 'campaign' | 'game' | 'sessionPlayers'>

export type FilledSession = {
  session: Session,
  game: Game,
  players: Player[],
}

export type SessionForm = {
  id: string,
  campaign: Campaign["id"],
  game: Game["id"],
  players: {
    player: Player["name"],
    color: SessionPlayer["color"],
  }[],
}

export type DataState = {
  getCampaignForm: (campaign?: Campaign) => Campaign,
  getGameForm: (game?: Game) => Game,
  getPlayerForm: (player?: Player) => Player,
  getSessionForm: (players: Player[], campaignId?: string, session?: Session) => SessionForm,
}