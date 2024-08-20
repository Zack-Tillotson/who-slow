'use client'

import Link from "next/link";
import { Button, SimpleGrid, Group, Stack, Text, Title, Divider } from "@mantine/core"

import { useDataState } from "@/state";
import { useSessionStats } from "./useSessionStats";

function nicePrintTime(ms) {
  const minutes = Math.trunc(Number(ms / 1000 / 60))
  const seconds = Math.trunc(Number((ms - minutes * 1000 * 60) / 1000))
  return `${('' + minutes).padStart(2, '0')}:${('' + seconds).padStart(2, '0')}`
}


type ViewProps = {
  sessionId: string,
}

export function SessionStats({sessionId}: ViewProps) {

  const {
    getSession,
    getPlayers,
  } = useDataState()
  const session = getSession(sessionId)
  
  if(!session) {
    throw new Error('session not found')
  }
  
  const {events, sessionPlayers} = session
  const players = getPlayers(sessionPlayers)
  
  const stats = useSessionStats(session, players)
  
  return (
    <div>
      <Title order={1}>
        Who Slow? {stats.highlights.slowestPlayer.player.name} Slow!
      </Title>

      <Divider />
      
      <Title order={2}>Game length: {nicePrintTime(stats.time)}</Title>
      <div>
        {stats.players.map((player, index) => (
          <div key={index}>
            <div className="playerColorBackground" style={{width: `${player.time / stats.time * 100}%`, backgroundColor: player.color}} />
            {player.player.name}: {nicePrintTime(player.time)}
          </div>
        ))}
      </div>
      <div>
        <Title order={3}>Slowest Turn</Title>
        <Text>🐢</Text>
        <Text>{stats.highlights.longestTurn.player.name}: {nicePrintTime(stats.highlights.longestTurn.time)}</Text>
      </div>
      <div>
        <Title order={3}>Fastest Turn</Title>
        <Text>⚡</Text>
        <Text>{stats.highlights.shortestTurn.player.name}: {nicePrintTime(stats.highlights.shortestTurn.time)}</Text>
      </div>

      <Divider />
      
      {stats.players.map((player, playerIndex) => (
        <div key={player.player.id}>
          <Title order={2}>{player.player.name}: {nicePrintTime(player.time)}</Title>
          <div>
            {player.turns.map((turn, index) => (
              <div key={index} className="player-stats__turns-turn">
                Turn {turn.round}: {nicePrintTime(turn.time)}
                <div className="game-stats__color-background" style={{width: `${turn.time / stats.highlights.longestTurn.time * 100}%`, backgroundColor: player.color}} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
