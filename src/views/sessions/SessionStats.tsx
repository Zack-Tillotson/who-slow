'use client'

import Link from "next/link";
import { Button, SimpleGrid, Group, Stack, Text, Title, Divider } from "@mantine/core"

import { useDataState } from "@/state";
import { useSessionStats } from "./useSessionStats";

import styles from './sessionStats.module.scss'

function nicePrintTime(ms: number) {
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
      <Title order={1} size="lg" ta="center" p="md">
        {stats.highlights.slowestPlayer.player.name} Slow!
      </Title>

      <Divider />
      
      <Title order={2} size="md">Total game length: {nicePrintTime(stats.time)}</Title>
      <div>
        {stats.players.map((player, index) => (
          <Text key={index} className={styles.playerColorContainer} size="md" pl="xs" mb="1px">
            <div className={styles.playerColor} style={{width: `${player.time / stats.time * 100}%`, backgroundColor: player.color}} />
            {player.player.name}: {nicePrintTime(player.time)}
          </Text>
        ))}
      </div>
      <Group grow>
        <Stack ta="center">
          <Title order={3}>Slowest Turn</Title>
          <Text size="48px">🐢</Text>
          <Text bg={`${stats.highlights.longestTurn.sessionPlayer?.color}`}>
            {stats.highlights.longestTurn.player.name}: {nicePrintTime(stats.highlights.longestTurn.time)}
          </Text>
        </Stack>
        <Stack ta="center">
          <Title order={3}>Fastest Turn</Title>
          <Text size="48px">⚡</Text>
          <Text bg={stats.highlights.shortestTurn.sessionPlayer?.color}>
            {stats.highlights.shortestTurn.player.name}: {nicePrintTime(stats.highlights.shortestTurn.time)}
          </Text>
        </Stack>
      </Group>

      <Divider />
      
      {stats.players.map((player, playerIndex) => (
        <div key={player.player.id}>
          <Title order={2} size="md">{player.player.name}: {nicePrintTime(player.time)}</Title>
          <div>
            {player.turns.map((turn, index) => (
              <Text key={index} className={styles.playerColorContainer} size="md" pl="xs" mb="1px">
                <div className={styles.playerColor}style={{width: `${turn.time / stats.highlights.longestTurn.time * 100}%`, backgroundColor: player.color}} />
                Turn {turn.round}: {nicePrintTime(turn.time)}
              </Text>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
