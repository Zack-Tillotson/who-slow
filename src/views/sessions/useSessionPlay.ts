import { useSetData } from "@/state/remote/useSetData";
import { Game, Player, Session, SessionEvent } from "@/state/types";
import { useState } from "react";

const DEFAULT_PLAYER = {
  name: 'Player',
  color: '#fff',
  playerId: '',
}

export function useSessionPlay(session: Session|null, game: Game, userId: string) {

  const {isPending, set: setSessionEvents} = useSetData(`sessions/${session?.id}`, 'events')
  const [isFixTurnDialogOpen, updateFixTurnDialog] = useState(false)
  const [isShareDialogOpen, updateShareDialogOpen] = useState(false)
  
  const pushSessionEvent = (event: SessionEvent) => {
    const updatedEvents = session ? [...(session.events || [])] : []
    updatedEvents.push(event)
    return setSessionEvents(updatedEvents)
  }

  const popSessionEvent = (popCount = 1) => {
    const updatedEvents = session ? (session.events || []).slice(0, -1 * popCount) : []
    return setSessionEvents(updatedEvents)
  }

  const events = session?.events || []

  const lastEvent = [...events].reverse()[0] || null
  const turnEvents = events.filter(tEvent => tEvent.type === 'TURN_START')
  const lastPlayerEvent = turnEvents[turnEvents.length - 1] || null
  const isUnstarted = events.length === 0
  const isEnded = !!lastEvent && lastEvent.type === 'END'
  const isPaused = !!lastEvent && lastEvent.type === 'PAUSE'
  const isSessionOwner = !!session && session.owner === userId

  const nextSessionPlayerIndex = turnEvents.length % (session?.sessionPlayers.length ?? 1)
  const sessionPlayer = session?.sessionPlayers[nextSessionPlayerIndex]
  const nextTurn = {
    playerId: sessionPlayer?.player ?? DEFAULT_PLAYER.playerId,
    name: sessionPlayer?.name ?? DEFAULT_PLAYER.name,
    color: sessionPlayer?.color ?? DEFAULT_PLAYER.color,
  }

  function getSession() {
    if(!session) {
      throw new Error(`session not found`)
    }
    return session
  }

  const handlePlayerClick = (who: Player["id"]) => () => {
    pushSessionEvent({type: 'TURN_START', who, when: Date.now()})
  }
  const handlePauseClick = () => {
    if(lastEvent.type === 'PAUSE') {
      const pauseDuration = Date.now() - lastEvent.when 
      const updatedEvents = (getSession().events || []).slice(0, -1).map(event => ({...event, when: event.when + pauseDuration }))
      setSessionEvents(updatedEvents)
    } else {
      pushSessionEvent({type: 'PAUSE', when: Date.now()})
    }
  }
  const handleUndoClick = () => {
    popSessionEvent()
  }
  const handleEndClick = () => {
    pushSessionEvent({type: 'END', when: Date.now()})
  }
  const handleFixTurnClick = () => {
    updateFixTurnDialog(!isFixTurnDialogOpen)
  }
  const handleFixTurnSubmit = (who: Player["id"], timeDiff: number) => {
    const when = timeDiff === 0 ? (Date.now() + lastPlayerEvent.when) / 2 : Date.now() - timeDiff * 1000 * 60;
    pushSessionEvent({type: 'TURN_START', who, when})
    updateFixTurnDialog(false)
  }
  const handleShareClick = () => {
    updateShareDialogOpen(!isShareDialogOpen)
  }

  return {
    isPending,
    isUnstarted,
    isEnded,
    isPaused,
    isShareDialogOpen,
    isFixTurnDialogOpen,
    isSessionOwner,

    nextTurn,

    handlePlayerClick,
    handleShareClick,
    handlePauseClick,
    handleEndClick,
    handleUndoClick,
    handleFixTurnClick,
    handleFixTurnSubmit,
  }
}