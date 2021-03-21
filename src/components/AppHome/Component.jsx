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

  const handleClickNewSessionClick = event => {
    dispatch(actions.uiRequestNewSession())
  }

  const formGame = games.find(game => game.id === form.game) || games[0]
  const formPlayers = form.players.map(player => players.find(findPlayer => findPlayer.id === player))

  return (
    <Page className="app-home">
      <div className="app-home__intro">Welcome to Who Slow the turn tracking application. Start a new session below and get tracking!</div>
        <div className="app-home__new-session new-session">
          <h2 className="app-home__session-title">Start new session</h2>
          <div className="new-session__attribute">
            <h3 className="new-session__attribute-title">Game:</h3>
            <div className="new-session__attribute-value">
              {formGame.name}
            </div>
            <Link to="/app/games/" className="new-session__change-button --button-like --hollow">
              ›
            </Link>
          </div>
          <div className="new-session__attribute">
            <h3 className="new-session__attribute-title">Players:</h3>
            <div className="new-session__attribute-value">
              {formPlayers.map(player => player.name).join(', ')}
            </div>
            <Link to="/app/players/" className="new-session__change-button --button-like --hollow">
              ›
            </Link>
          </div>
          <button className="--button-like --primary --wide" onClick={handleClickNewSessionClick}>
            Start session
          </button>
      </div>
      <div className="app-home__resume-button">
        or <Link to="/app/sessions/" className="--button-like --minimal app-home__resume-button">Resume session</Link>
      </div>
    </Page>
  );
}

export default Component;