import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import cn from 'classnames'
import {useDispatch} from 'react-redux'

import {actions} from 'state'
import useSessionState from 'state/useState'

import Page from 'components/Page'
import Timer from 'components/Timer'

import './component.scss'
import logo from 'assets/turtle-400x400.png'

function Component(props) {
  const dispatch = useDispatch()

  const sessionConfig = useSessionState('sessionConfig')
  const session = useSessionState('session');
  
  const {sessionId} = props.match.params
  
  useEffect(() => {
    dispatch(actions.uiRequestLoadSession({sessionId}))
  }, [sessionId])

  const [events, updateEvents] = useState([]) // END, TURN_START, PAUSE, PAUSE_END

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
  const isEnded = !!events.find(tEvent => tEvent.type === 'END')
  const isPaused = !!lastEvent && lastEvent.type === 'PAUSE'

  const handlePlayerClick = who => event => updateEvents([...events, {type: 'TURN_START', who, when: Date.now()}])
  const handlePauseClick = event => {
    if(lastEvent.type === 'PAUSE') {
      updateEvents([...events.slice(0, -2), {...lastPlayerEvent, when: Date.now() + lastPlayerEvent.when - lastEvent.when}])
    } else {
      updateEvents([...events, {type: 'PAUSE', when: Date.now()}])
    }
  }

  return (
    <Page className="session">
      <Timer className="session__timer" events={events} players={players} />
      <div className="session__controls">
        <button className={cn('--button-like', '--hollow', {['--disabled']: isUnstarted})} disabled={isUnstarted}>End</button>
        <button className={cn('--button-like', {['--disabled']: isUnstarted, ['--primary']: isPaused, ['--hollow']: !isPaused})} disabled={isUnstarted} onClick={handlePauseClick}>{isPaused ? 'Unpause' : 'Pause'}</button>
        <button className={cn('--button-like', '--hollow', {['--disabled']: events.length === 0})} disabled={events.length === 0}>Undo</button>
      </div>
      <div className="session__players">
        {players.map(player => (
          <button 
            key={player.id} 
            className={cn('player', '--button-like', '--primary', {['--disabled']: isPaused})} 
            style={{backgroundColor: player.color}} 
            onClick={handlePlayerClick(player.id)} 
            disabled={isPaused}>
              {player.name}
          </button>
        ))}
      </div>
    </Page>
  );
}

export default Component;