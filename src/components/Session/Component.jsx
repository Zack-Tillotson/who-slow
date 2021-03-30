import React, {useEffect, useState as useReactState} from 'react';
import {Link} from 'react-router-dom'
import cn from 'classnames'
import {useDispatch} from 'react-redux'

import {actions} from 'state'
import useState from 'state/useState'

import Page from 'components/Page'
import Timer from 'components/Timer'
import FixTurnDialog from 'components/FixTurnDialog'

import './component.scss'
import logo from 'assets/turtle-400x400.png'

function Component(props) {
  const dispatch = useDispatch()

  const [sessionConfig] = useState('sessionConfig')
  const [session] = useState('session');
  
  const {sessionId} = props.match.params
  
  useEffect(() => {
    dispatch(actions.uiRequestLoadSession({sessionId}))
  }, [sessionId])

  const [events, updateEvents] = useState('session/events') // END, TURN_START, PAUSE, PAUSE_END

  const [isFixTurnDialogOpen, updateFixTurnDialog] = useReactState(false)

  if(!session.status.isInitialized || !sessionConfig.status.isInitialized) {
    return (
      <div className="page__loader">
        <img src={logo} />
      </div>
    )    
  }

  const game = sessionConfig.games[session.game]
  const players = session.players.map(playerId => sessionConfig.players.find(player => player.id === playerId)).filter(Boolean)

  const lastEvent = [...events].reverse()[0] || null
  const lastPlayerEvent = events.filter(tEvent => tEvent.type === 'TURN_START').reverse()[0] || null
  const isUnstarted = events.length === 0
  const isEnded = !!lastEvent && lastEvent.type === 'END'
  const isPaused = !!lastEvent && lastEvent.type === 'PAUSE'

  const handlePlayerClick = who => event => updateEvents([...events, {type: 'TURN_START', who, when: Date.now()}])
  const handlePauseClick = event => {
    if(lastEvent.type === 'PAUSE') {
      updateEvents([...events.slice(0, -2), {...lastPlayerEvent, when: Date.now() + lastPlayerEvent.when - lastEvent.when}])
    } else {
      updateEvents([...events, {type: 'PAUSE', when: Date.now()}])
    }
  }
  const handleUndoClick = event => {
    updateEvents([...events.slice(0, -1)])
  }
  const handleEndClick = event => {
    updateEvents([...events, {type: 'END', when: Date.now()}])
  }
  const handleFixTurnClick = event => {
    updateFixTurnDialog(!isFixTurnDialogOpen)
  }
  const handleFixTurnSubmit = (who, timeDiff, ignoreInStats) => {
    const when = timeDiff === 0 ? (Date.now() + lastPlayerEvent.when) / 2 : Date.now() - timeDiff * 1000 * 60;
    const newEvents = [...events, {type: 'TURN_START', who, when}]
    if(ignoreInStats) {
      [newEvents.length - 2, newEvents.length - 1].forEach(index => newEvents[index].ignoreInStats = true)
    }
    updateEvents(newEvents)
    updateFixTurnDialog(false) 
  }

  return (
    <Page className="session">
      <Timer className="session__timer" events={events} players={players} />
      <div className="session__controls">
        <button 
          className={cn('--button-like', '--hollow', {['--disabled']: isUnstarted || isEnded})}
          disabled={isUnstarted || isEnded}
          onClick={handleEndClick}>
            End
        </button>
        <button 
          className={cn('--button-like', {['--disabled']: isUnstarted || isEnded, ['--primary']: isPaused, ['--hollow']: !isPaused})} 
          disabled={isUnstarted || isEnded} 
          onClick={handlePauseClick}>
            Pause
        </button>
        <button 
          className={cn('--button-like', '--hollow', {['--disabled']: events.length === 0})} 
          disabled={events.length === 0} 
          onClick={handleUndoClick}>
            Undo
        </button>
        <button 
          className={cn('--button-like', '--hollow', {['--disabled']: events.length === 0})} 
          disabled={events.length === 0} 
          onClick={handleFixTurnClick}>
            Fix Turn
        </button>
      </div>
      {isEnded && (
        <div className="session__ended">
          <Link 
            to={`/app/session/${sessionId}/stats/`}
            className={cn('--button-like', '--primary', '--wide')}>
              View Stats
          </Link>
        </div>
      )}
      {isFixTurnDialogOpen && (
        <div className="session__fix-turn">
          <FixTurnDialog onCancel={() => updateFixTurnDialog(false)} onSubmit={handleFixTurnSubmit} players={players} lastPlayerEvent={lastPlayerEvent} />
        </div>
      )}
      {!isFixTurnDialogOpen && (
        <div className="session__players">
          {players.map(player => (
            <button 
              key={player.id} 
              className={cn('player', '--button-like', '--primary', {['--disabled']: isPaused || isEnded})} 
              style={{backgroundColor: player.color}} 
              onClick={handlePlayerClick(player.id)} 
              disabled={isPaused || isEnded}>
                {player.name}
            </button>
          ))}
        </div>
      )}
    </Page>
  );
}

export default Component;