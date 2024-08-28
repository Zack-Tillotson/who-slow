import { useDataState } from "@/state";
import { useState } from "react";

export function useSessionPlay(sessionId: string|number) {
  const {
    getSession,
    getGame,
    getPlayers,
    setSessionEvents,
    pushSessionEvent,
    popSessionEvent,
  } = useDataState()

  const session = getSession(sessionId)

  if(!session) {
    throw new Error('Session must exist to use useSessionPlay')
  }

  const [isFixTurnDialogOpen, updateFixTurnDialog] = useState(false)

  const game = getGame(session.game)
  const players = getPlayers(session.sessionPlayers)
  const events = session.events || []

  const lastEvent = [...events].reverse()[0] || null
  const turnEvents = events.filter(tEvent => tEvent.type === 'TURN_START')
  const lastPlayerEvent = turnEvents[turnEvents.length - 1] || null
  const isUnstarted = events.length === 0
  const isEnded = !!lastEvent && lastEvent.type === 'END'
  const isPaused = !!lastEvent && lastEvent.type === 'PAUSE'
  
  const nextSessionPlayerIndex = turnEvents.length % session.sessionPlayers.length
  const sessionPlayer = session.sessionPlayers[nextSessionPlayerIndex]
  const nextPlayer = players.find(({id}) => session.sessionPlayers[nextSessionPlayerIndex].player == id) || players[0]
  const nextTurn = {
    playerId: nextPlayer?.id,
    name: nextPlayer?.name,
    color: sessionPlayer.color,
  }

  const handlePlayerClick = (who: number) => () => pushSessionEvent(session, {type: 'TURN_START', who, when: Date.now()})
  const handlePauseClick = () => {
    if(lastEvent.type === 'PAUSE') {
      const pauseDuration = Date.now() - lastEvent.when 
      const updatedEvents = session.events.slice(0, -1).map(event => ({...event, when: event.when + pauseDuration }))
      setSessionEvents(session, updatedEvents)
    } else {
      pushSessionEvent(session, {type: 'PAUSE', when: Date.now()})
    }
  }
  const handleUndoClick = () => {
    popSessionEvent(session)
  }
  const handleEndClick = () => {
    pushSessionEvent(session, {type: 'END', when: Date.now()})
  }
  const handleFixTurnClick = () => {
    updateFixTurnDialog(!isFixTurnDialogOpen)
  }
  const handleFixTurnSubmit = (who: number, timeDiff: number) => {
    const when = timeDiff === 0 ? (Date.now() + lastPlayerEvent.when) / 2 : Date.now() - timeDiff * 1000 * 60;
    pushSessionEvent(session, {type: 'TURN_START', who, when})
    updateFixTurnDialog(false)
  }

  return {
    isUnstarted,
    isEnded,
    isPaused,
    isFixTurnDialogOpen,

    nextTurn,

    handlePlayerClick,
    handlePauseClick,
    handleEndClick,
    handleUndoClick,
    handleFixTurnClick,
    handleFixTurnSubmit,
  }
}