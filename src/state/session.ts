import { 
  Session,
  SessionEvent,
  DataState,
  SessionForm,
} from './types'

export default function sessionState(get: () => DataState, set: (state: Partial<DataState>) => void) {
  return {
    getSession(stringId: string | number) {
      const session = get().getSessions().find(({id}) => id === Number(stringId))
      return session
    },

    getSessions() {
      return get().sessions
    },

    saveSession(session: Session) {
      // TODO validate

      const {getSessions, getCampaign, saveCampaign} = get()
      const sessions = getSessions()
      
      // Update ID as needed
      if(typeof session.id === 'string') session.id = Number(session.id)
      if(session.id < 0) {
        session.id = (sessions[sessions.length - 1]?.id ?? 0) + 1
      }

      // Add events as needed
      if(!session.events) {
        session.events = []
      }

      // Update campaign as needed
      if(session.campaign === -1) {
        let defaultCampaign = getCampaign(0)
        if(!defaultCampaign) {
          defaultCampaign = saveCampaign({id: 0, name: 'Just play'})
        }
        session.campaign = defaultCampaign.id
      }

      const updatedSessions = [...sessions]

      // Add to state
      const existingIndex = sessions.findIndex(({id}) => id === session.id)
      if(existingIndex < 0) {
        updatedSessions.push(session)
      } else {
        updatedSessions[existingIndex] = session
      }
      
      set({
        sessions: updatedSessions,
      })

      return session
    },

    saveSessionForm(formData: SessionForm) {
      const session = get().getSession(formData.id) || {
        id: formData.id,
        date: new Date().getTime(),
        game: -1,
        campaign: -1,
        sessionPlayers: [],
        events: [],
      }

      const players = get().getPlayers()

      session.game = Number(formData.game)
      session.campaign = formData.campaign
      session.sessionPlayers = formData.players.map(({player, color}, index) => {
        let foundPlayer = players.find(({name}) => name == player)
        if(!foundPlayer) {
          foundPlayer = get().savePlayer({id: -1, name: player})
        }
        return {
          id: index,
          player: foundPlayer.id,
          color,
          order: index + 1,
        }
      })
      
      return get().saveSession(session)
    },

    getSessionForm(sessionId = '-1', campaignId = '-1'): SessionForm {
      if(sessionId != '-1') {
        const session = get().getSession(sessionId)
        if(session) {
          const players = get()
            .getPlayers(session.sessionPlayers)
            .map((player, index) => ({
              player: player.name, 
              color: session.sessionPlayers[index].color,
            }))
          return {
            id: session.id,
            campaign: session.campaign,
            game: session.game,
            players,
          }
        }
      }

      const sessions = get().getCampaignSessions(Number(campaignId))
      if(sessions.length > 0) {
        const priorSession = sessions[sessions.length - 1]
        const {campaign, game, sessionPlayers} = priorSession
        const players = get()
          .getPlayers(sessionPlayers)
          .map((player, index) => ({
            player: player.name, 
            color: sessionPlayers[index].color,
          }))
        return {
          id: -1,
          campaign,
          game,
          players,
        }
      }

      return {
        id: -1,
        campaign: Number(campaignId),
        game: 0,
        players: [],
      }
    },
    getSessionStatus(session: Session) {
      const latestType = session.events.length === 0 
        ? '' 
        : session.events[session.events.length - 1].type
      return latestType
    },
    getSessionStatusText(session: Session) {
      const latestType = get().getSessionStatus(session)
      switch(latestType) {
        case '':
          return 'Not started'
        case 'PAUSE':
          return 'Paused'
        case 'TURN_START':
          return 'In progress'
        case 'END':
          return 'Session ended'
        default:
          return 'Unknown'
      }
    },
    setSessionEvents: (session: Session, events: SessionEvent[]) => {
      return get().saveSession({...session, events})
    },
    pushSessionEvent: (session: Session, event: SessionEvent) => {
      const updatedSession = {...session, events: [...session.events || []]}
      updatedSession.events.push(event)
      return get().saveSession(updatedSession)
    },
    popSessionEvent: (session: Session, popCount = 1) => {
      const updatedSession = {...session, events: session.events.slice(0, -1 * popCount)}
      return get().saveSession(updatedSession)
    },
  }
}