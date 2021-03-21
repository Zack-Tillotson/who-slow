import React from 'react';
import {Link} from 'react-router-dom'

import {useState, dispatchAction, actions} from 'state'
import {useDispatch} from 'react-redux'
import cn from 'classnames'

import Page from 'components/Page'

import './component.scss'
import logo from 'assets/logo-400x400.png'

function Component(props) {

  const [sessionConfig] = useState('sessionConfig');
  const {status, players, games, sessions, newSessionForm: form} = sessionConfig;
  const dispatch = useDispatch()
  
  if(!status.isInitialized) {
    return (
      <div className="page__loader">
        <img src={logo} />
      </div>
    )    
  }

  return (
    <Page className="app-sessions">
      <div className="app-sessions__breadcrumbs">
        <Link to="/app/" className="--button-like --minimal">Go back</Link>
      </div>
      <div className="app-session__intro">
        Select a session from the list below.
      </div>
      <h2>Sessions</h2>
      <div className="app-sessions__list">
        {[...sessions].reverse().map(session => (
          <div index={session.id} className="app-sessions__list-item">
            <div className="app-sessions__list-title">
              <b>Game:</b> {games.find(game => game.id === session.game).name}
            </div>
            <div className="app-sessions__list-title">
              <b>Players:</b> {session.players.map(playerId => players.find(player => player.id === playerId)).map(player => player.name).join(', ')}
            </div>
            <div className="app-sessions__session-link">
              <Link to={`/app/session/${session.id}/`} className="--button-like --hollow">Resume</Link>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

export default Component;