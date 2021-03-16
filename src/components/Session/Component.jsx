import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import cn from 'classnames'
import {useDispatch} from 'react-redux'

import {actions} from 'state'
import useState from 'state/useState'

import Page from 'components/Page'
import Timer from 'components/Timer'

import './component.scss'
import logo from 'assets/turtle-400x400.png'

function Component(props) {
  const dispatch = useDispatch()

  const sessionConfig = useState('sessionConfig')
  const session = useState('session');
  
  const {sessionId} = props.match.params
  
  useEffect(() => {
    dispatch(actions.uiRequestLoadSession({sessionId}))
  }, [sessionId])

  if(!session.status.isInitialized || !sessionConfig.status.isInitialized) {
    return (
      <div className="page__loader">
        <img src={logo} />
      </div>
    )    
  }

  const game = sessionConfig.games[session.game]
  const players = session.players.map(playerId => sessionConfig.players.find(player => player.id === playerId)).filter(Boolean)

  return (
    <Page className="session">
      <Timer className="session__timer" />
      <div className="session__controls">
        <button className="--button-like --hollow">Start/Stop</button>
        <button className="--button-like --hollow">Pause</button>
        <button className="--button-like --hollow">Undo</button>
      </div>
      <div className="session__players">
        {players.map(player => (
          <button key={player.id} className="player --button-like --primary">
            {player.name}
          </button>
        ))}
      </div>
    </Page>
  );
}

export default Component;