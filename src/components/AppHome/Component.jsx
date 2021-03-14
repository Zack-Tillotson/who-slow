import React from 'react';
import {Link} from 'react-router-dom'

import {useState} from 'state'
import cn from 'classnames'

import Page from 'components/Page'

import './component.scss'

function Component(props) {

  const players = useState('sessionConfig/players')
  const games = useState('sessionConfig/games')
  const sessions = useState('sessionConfig/sessions')

  return (
    <Page>
      <div>
        <h1>Who Slow</h1>

        <div className="players-list">
          <h2>Players</h2>
          {players.length} players
        </div>

        <div className="games-list">
          <h2>Games</h2>
          {games.length} games
        </div>

        <div className="session-list">
          <h2>Sessions</h2>
          {sessions.isLoaded && sessions.value.map(session => (
            <div className="session-list__item" key={session.id}>
              <h3>{session.game.name}</h3>
              <Link to={`/app/session/${session.id}/`}>Open</Link>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

export default Component;