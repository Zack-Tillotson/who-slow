import {useState, useEffect} from 'react';

import { Player, SessionEvent, SessionPlayer } from '@/state/types';

const COLOR_DEFAULT = 'rgba(0,0,0,0)'
const COLOR_PAUSE = '#ccc'

interface EventTimesProp {
  lastEvent: SessionEvent,
  lastPlayerEvent: SessionEvent,
  firstEvent: SessionEvent,
}

function getEventTimes({
  lastEvent,
  lastPlayerEvent,
  firstEvent,
}: EventTimesProp) {
  
  if(!lastEvent) return []

  if(lastEvent.type ===  'TURN_START') return [lastEvent.when, Date.now()]
  if(lastEvent.type === 'PAUSE') return [lastPlayerEvent.when, lastEvent.when]
  if(lastEvent.type === 'END') return [firstEvent.when, lastEvent.when]

  console.warn('Timer logic is wack')
  return []

}

function getTimeSince(startTime = 0, endTime = 0): string {
  if(!startTime) return '00:00'

  const length = endTime - startTime
  const minutes = Math.trunc(Number(length / 1000 / 60))
  const seconds = Math.trunc(Number(length - minutes * 1000 * 60) / 1000)
  return `${minutes}`.padStart(2, '0') + ':' + `${seconds}`.padStart(2, '0') 
}

export function useTimer(events: SessionEvent[], players: Player[], sessionPlayers: SessionPlayer[]) {

  const firstEvent = events[0] || null
  const lastEvent = [...events].reverse()[0] || null
  const lastPlayerEvent = events.filter(tEvent => tEvent.type === 'TURN_START').reverse()[0] || null
  const currentSessionPlayer = lastEvent ? sessionPlayers.find(player => player.player == lastEvent.who) : null
  const currentPlayer = lastEvent ? players.find(player => player.id == lastEvent.who) : null

  const [clock, updateClock] = useState('')
  useEffect(() => {
    updateClock(getTimeSince(...getEventTimes({lastEvent, lastPlayerEvent, firstEvent})))
    const clockInterval = setInterval(() => {
      updateClock(getTimeSince(...getEventTimes({lastEvent, lastPlayerEvent, firstEvent})))
    }, 100)
    return () => clearInterval(clockInterval)
  }, [lastEvent, lastPlayerEvent, firstEvent])

  const [isClockVisible, updateIsClockVisible] = useState(true)

  let borderColor = COLOR_DEFAULT
  switch(true) {
    case (lastEvent && lastEvent.type === 'PAUSE'): {
      borderColor = COLOR_PAUSE
    }
    break

    case (lastEvent && lastEvent.type === 'TURN_START'): {
      borderColor = currentSessionPlayer?.color ?? COLOR_DEFAULT
    }
    break
  }

  const roundCount = Math.trunc((events.length - 1) / players.length) + 1
  const turnCount = events.filter(event => event.type === 'TURN_START').length + 1

  const handleClick = () => {
    updateIsClockVisible(!isClockVisible)
  }

  return {
    isClockVisible,
    currentPlayer,
    clock,
    roundCount,
    turnCount,
    borderColor,

    handleClick,
  }
}
