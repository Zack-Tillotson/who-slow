'use client'

import Link from "next/link";
import { Button, SimpleGrid, Group, Stack, Text, Title, Divider } from "@mantine/core"

import { useDataState } from "@/state";
import { useSessionStats } from "./useSessionStats";

import styles from './sessionStats.module.scss'
import { Game, Player, Session } from "@/state/types";

function getTimePieces(ms: number) {
  const hours = Math.trunc(Number(ms / 1000 / 60 / 60))
  const minutes = Math.trunc(Number((ms - hours * 1000 * 60 * 60) / 1000 / 60))
  const seconds = Math.trunc(Number((ms - minutes * 1000 * 60) / 1000))
  return {
    hours,
    minutes,
    seconds,
  }
}

function nicePrintTime(ms: number) {
  const {hours, minutes, seconds} = getTimePieces(ms)
  
  if(hours) {
    return `${hours}h ${('' + minutes).padStart(2, '0')}m`
  }
  if(minutes) {
    return `${minutes}m ${('' + seconds).padStart(2, '0')}s`
  }
  return `${seconds}s`
}

function chartPrintTime(ms: number) {
  const {hours, minutes, seconds} = getTimePieces(ms)

  if(hours) {
    return `${hours}:${('' + minutes).padStart(2, '0')}:${('' + seconds).padStart(2, '0')}`
  }
  return `${minutes}:${('' + seconds).padStart(2, '0')}`
}

interface HighlightStatType {
  icon: string,
  label: string,
  value: string|number,
  valueBg?: string,
}

function HighlightStat({icon, label, value, valueBg}: HighlightStatType) {
  return (
    <Stack ta="center" gap="0">
      <Text size="24px">{icon}</Text>
      <Title order={3} size="md" fw="normal">{label}</Title>
      <Text fw={600} style={{background: valueBg || ''}} className={styles.playerColor} >
        {value}
      </Text>
    </Stack>
  )
}

type ViewProps = {
  session?: Session,
  players: Player[],
  game: Game,

}

export function SessionStats({session, players, game}: ViewProps) {

  if(!session) {
    throw new Error('session not found')
  }
  
  const {events, sessionPlayers} = session
  
  const stats = useSessionStats(session, players, game)
  
  return (
    <div>
      <Stack gap="0">
        <Title
          order={1}
          className={styles.title}
          size="lg"
          p="0"
          m="0"
        >
          Who slow?
        </Title>
        <Text
          className={styles.playerColorContainer + ' ' + styles.playerColor}
          size="xl"
          p="md"
          mb="1px"
          fw={600}
          style={{backgroundColor: stats.highlights.slowestPlayer.color}}
        >
          {stats.highlights.slowestPlayer.player.name} slow!
        </Text>
      </Stack>

      <Divider mt="md" mb="md" />
      
      <Title className={styles.title} order={2} size="md" mb="md">Game statistics</Title>
      
      <Group grow>
        <HighlightStat
          icon="🕑"
          label="Time"
          value={nicePrintTime(stats.game.time)} 
        />
        <HighlightStat
          icon="⟳"
          label="Rounds"
          value={stats.game.rounds}
        />
      </Group>
      <Group grow mt="md">
        <HighlightStat
          icon="🐢"
          label="Slowest turn"
          value={`${stats.highlights.longestTurn.player.name}: ${nicePrintTime(stats.highlights.longestTurn.time)}`}
          valueBg={stats.highlights.longestTurn.sessionPlayer?.color}
        />
        <HighlightStat
          icon="⚡"
          label="Fastest turn"
          value={`${stats.highlights.shortestTurn.player.name}: ${nicePrintTime(stats.highlights.shortestTurn.time)}`}
          valueBg={stats.highlights.shortestTurn.sessionPlayer?.color}
        />
      </Group>

      <Title className={styles.title} order={2} size="md" mt="md" mb="md">Time per player</Title>
      <div className={styles.chart}>
        {stats.players.map((player, index) => (
          [
            <div key={`${index}-name`} className={styles.chartColorStat}>
              {player.player.name}
            </div>
          ,
            <div key={`${index}-time`} className={styles.chartColorStat}>
              {chartPrintTime(player.time)}
            </div>
          ,
            <div key={`${index}-bar`}>
              <div
                className={styles.playerColor}
                style={{width: `${player.time / stats.highlights.slowestPlayer.time * 100}%`, backgroundColor: player.color}}>
                  {'\u00A0'}
              </div>
            </div>
          ]
        )).reduce((all, subset) => ([...all, ...subset]), [])}

      </div>

      {stats.game && (
        <div>
          <Title order={3} size="lg">{stats.game.name} ({stats.game.yearPublished})</Title>
          <img src={stats.game.image} alt={`Box art for ${stats.game.name}`} />
        </div>
      )}

      <Divider mt="md" mb="md" />
      
      <Title order={2} size="md" mb="md">Player statistics</Title>
      {stats.players.map(player => (
        <div key={player.player.id}>
          <Title order={3} size="md" mt="lg">{player.player.name}</Title>
          <div className={styles.chart}>
            <Text
              className={styles.chartTitle}
              size="xs"
              ta="center"
            >
              Turn
            </Text>
            <Text
              className={styles.chartTitle}
              size="xs"
              ta="center"
            >
              Time
            </Text>
            <Text>{/* empty */}</Text>
            {player.turns.map((turn, index) => (
              [
                <Text
                  key={`${index}-round`}
                  className={styles.playerColorContainer}
                  size="sm"
                  ta="center"
                >
                  {turn.round}
                </Text>
              ,
                <Text
                  key={`${index}-value`}
                  size="sm"
                  ta="center"
                >
                  {chartPrintTime(turn.time)}
                </Text>
              ,
                <div key={`${index}-bar`}>
                  <div
                    className={styles.playerColor}
                    style={{
                      fontSize: '12px',
                      width: `${turn.time / stats.highlights.longestTurn.time * 100}%`, 
                      backgroundColor: player.color,
                    }}
                  >
                    {'\u00A0'}
                  </div>
                </div>
              ]
            )).reduce((all, subset) => ([...all, ...subset]), [])}
          </div>
        </div>
      ))}
    </div>
  );
}
