import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import cn from 'classnames'
import {useDispatch} from 'react-redux'

import {actions} from 'state'
import useState from 'state/useState'

import Page from 'components/Page'


import './component.scss'
import logo from 'assets/logo-400x400.png'

function calculateStats(session, fullPlayers) {
  const {events} = session

  const turns = events.map((event, index) => {
    if(index - 1 < 0) return null

    const prevEvent = events[index-1]
    return {
      turn: index,
      time: event.when - prevEvent.when,
      player: fullPlayers.find(player => player.id === prevEvent.who),
    }
  }).filter(Boolean)

  const playersWithTurns = session.players.map(playerId => {
    const player = fullPlayers.find(player => player.id === playerId)
    return {
      player,
      turns: turns.filter(turn => turn.player === player),
    }
  }).map(player => ({
    ...player,
    time: player.turns.reduce((time, turn) => time + turn.time, 0),
    turns: player.turns.map((turn, index) => ({...turn, round: index + 1}))
  }))

  const longestTurn = turns.sort((a, b) => b.time - a.time)[0]
  const shortestTurn = turns.sort((a, b) => a.time - b.time)[0]
  const slowestPlayer = playersWithTurns.sort((a, b) => b.time - a.time)[0]

  return {
    time: turns.reduce((time, turn) => time + turn.time, 0),
    players: playersWithTurns,
    highlights: {
      shortestTurn,
      longestTurn,
      slowestPlayer,
    },
  }
}

function nicePrintTime(ms) {
  const minutes = Math.trunc(Number(ms / 1000 / 60))
  const seconds = Math.trunc(Number((ms - minutes * 1000 * 60) / 1000))
  return `${('' + minutes).padStart(2, '0')}:${('' + seconds).padStart(2, '0')}`
}

function Component(props) {
  const dispatch = useDispatch()

  const [sessionConfig] = useState('sessionConfig')
  const [session] = useState('session');
  
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

  const stats = calculateStats(session, sessionConfig.players)

  return (
    <Page className="session-stats">
      <h1 className="session-stats__title">
        Who Slow? {stats.highlights.slowestPlayer.player.name} Slow!
      </h1>

      <hr />
      
      <div className="session-stats__game-stats game-stats">
        <h2>Game length: {nicePrintTime(stats.time)}</h2>
        <div className="game-stats__overview">
          {stats.players.map((player, index) => (
            <div key={index} className="game-stats__overview-player">
              <div className="game-stats__color-background" style={{width: `${player.time / stats.time * 100}%`, backgroundColor: player.player.color}} />
              {player.player.name}: {nicePrintTime(player.time)}
            </div>
          ))}
        </div>
        <div className="game-stats__highlights">
          <div className="game-stats__highlight stats-highlight">
            <div className="stats-highlight__title">Slowest Turn</div>
            <div className="stats-highlight__icon">🐢</div>
            <div className="stats-highlight__value">{stats.highlights.longestTurn.player.name}: {nicePrintTime(stats.highlights.longestTurn.time)}</div>
          </div>
          <div className="game-stats__highlight stats-highlight">
            <div className="stats-highlight__title">Fastest Turn</div>
            <div className="stats-highlight__icon">⚡</div>
            <div className="stats-highlight__value">{stats.highlights.shortestTurn.player.name}: {nicePrintTime(stats.highlights.shortestTurn.time)}</div>
          </div>
        </div>
      </div>

      <hr />
      
      {stats.players.map(player => (
        <div key={player.player.id} className="session-stats__player-stats player-stats">
          <h2>{player.player.name}: {nicePrintTime(player.time)}</h2>
          <div className="player-stats__turns">
            {player.turns.map((turn, index) => (
              <div key={index} className="player-stats__turns-turn">
                Turn {turn.round}: {nicePrintTime(turn.time)}
                <div className="game-stats__color-background" style={{width: `${turn.time / stats.highlights.longestTurn.time * 100}%`, backgroundColor: player.player.color}} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </Page>
  );
}

export default Component;