import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import cn from 'classnames'
import {useDispatch} from 'react-redux'

import {actions} from 'state'
import useState from 'state/useState'

import Page from 'components/Page'

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
    <Page>
      <h1>Who Slow</h1>
      <div className="session">
        <h2>Session</h2>
        {session.isLoading && '...'}
        {session.isLoaded && `Session ${session.value.id}`}        
      </div>
    </Page>
  );
}

export default Component;