import React from 'react';
import {Link} from 'react-router-dom'

import cn from 'classnames'

import useData from 'data/useData';

import './component.scss'

function Component(props) {
  const players = useData('players')
  const games = useData('games')
  const sessions = useData('sessions')

  return (
    <div>
      <h1>Who Slow</h1>
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
  );
}

export default Component;