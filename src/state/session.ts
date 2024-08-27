import { 
  Session,
  SessionEvent,
  DataState,
} from './types'

export default function (get: () => DataState, set: (state: Partial<DataState>) => void) {
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

      const {getSessions} = get()
      const sessions = getSessions()
      
      // Update ID as needed
      if(typeof session.id === 'string') session.id = Number(session.id)
      if(session.id < 0) {
        session.id = sessions.length
      }

      // Add events as needed
      if(!session.events) {
        session.events = []
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

    getSessionForm(stringId = '-1', campaignId = '-1') {
      if(stringId && stringId != '-1') {
        const session = get().getSession(stringId)
        if(session) {
          return session
        }
      }

      const sessions = get().getCampaignSessions(Number(campaignId))
      if(sessions.length > 0) {
        const priorSession = sessions[sessions.length - 1]
        const copySession = JSON.parse(JSON.stringify(priorSession))
        return {
          ...copySession,
          id: -1,
        }
      }

      return {
        id: -1,
        date: Date.now(),
        campaign: Number(campaignId),
        game: -1,
        sessionPlayers: [],
        events: [],
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