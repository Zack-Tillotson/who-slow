import React, {useState, useEffect} from 'react';

import cn from 'classnames'

import './component.scss'

const COLOR_DEFAULT = 'rgba(0,0,0,0)'
const COLOR_PAUSE = '#ccc'

function getEventTimes(events) {
  const lastEvent = [...events].reverse()[0] || null
  const lastPlayerEvent = events.filter(tEvent => tEvent.type === 'TURN_START').reverse()[0] || null

  if(!lastEvent) return []

  if(lastEvent.type ===  'TURN_START') return [lastEvent.when, Date.now()]
  if(lastEvent.type === 'PAUSE') return [lastPlayerEvent.when, lastEvent.when]
  if(lastEvent.type === 'END') return [events[0].when, lastEvent.when]

  console.warn('Timer logic is wack')
  return []

}

function getTimeSince(startTime = 0, endTime = 0) {
  if(!startTime) return '00:00'

  const length = endTime - startTime
  const minutes = Math.trunc(Number(length / 1000 / 60))
  const seconds = Math.trunc(Number(length - minutes * 1000 * 60) / 1000)
  return `${minutes}`.padStart(2, '0') + ':' + `${seconds}`.padStart(2, '0') 
}

function Component({events, players}) {

  const lastEvent = [...events].reverse()[0] || null
  const player = lastEvent ? players.find(player => player.id === lastEvent.who) : null

  const [clock, updateClock] = useState()
  useEffect(() => {
    updateClock(getTimeSince(...getEventTimes(events)))
    const clockInterval = setInterval(() => {
      updateClock(getTimeSince(...getEventTimes(events)))
    }, 1000)
    return () => clearInterval(clockInterval)
  }, [events])

  const [isClockVisible, updateIsClockVisible] = useState(true)

  let borderColor = COLOR_DEFAULT
  switch(true) {
    case (lastEvent && lastEvent.type === 'PAUSE'): {
      borderColor = COLOR_PAUSE
    }
    break

    case (lastEvent && lastEvent.type === 'TURN_START'): {
      borderColor = player.color
    }
    break
  }

  const turnCount = events.filter(event => player && event.who === player.id).length

  const handleClick = event => {
    updateIsClockVisible(!isClockVisible)
  }

  return (
    <div className={cn('timer', {['timer--no-clock']: !isClockVisible})} style={{borderColor}} onClick={handleClick}>
      <div className="timer__player">{!lastEvent && 'Click player to start' || lastEvent.type === 'END' && 'Click "View stats" for game overview' || !player && '-' || player.name}</div>
      <div className="timer__clock">{clock}</div>
      <div className="timer__round">Round {Math.trunc((events.length - 1) / players.length) + 1}</div>
      <div className="timer__turn">{turnCount && `Turn ${turnCount}` || '-'}</div>
    </div>
  );
}

export default Component;