'use client'

import Link from "next/link";
import { Button, SimpleGrid, Group, Stack, Text, Title } from "@mantine/core"

import { useDataState } from "@/state";
import { useSessionPlay } from "./useSessionPlay";
import { Timer } from "./timer";
import {FixTurnForm} from './fixTurnForm'

import styles from './sessionPlay.module.scss'
import { PlayerParade } from "./playerParade";

type ViewProps = {
  sessionId: string,
}

export function SessionPlay({sessionId}: ViewProps) {

  const {
    getSession,
    getPlayers,
  } = useDataState()
  const session = getSession(sessionId)
  const {
    isUnstarted,
    isEnded,
    isPaused,
    isFixTurnDialogOpen,
    
    nextTurn,

    handlePlayerClick,
    handlePauseClick,
    handleEndClick,
    handleUndoClick,
    handleFixTurnClick,
    handleFixTurnSubmit,
  } = useSessionPlay(sessionId)

  if(!session) {
    return (
      <h1>Error: session not found</h1>
    )
  }

  const {events, sessionPlayers} = session
  const players = getPlayers(sessionPlayers)

  

  return (
    <div className={styles.container}>
      <div>
        {!isUnstarted && !isFixTurnDialogOpen && (
          <Group gap="xs">
            <Button p="xs" m="0" fz="xs" onClick={handleUndoClick} disabled={isPaused || session.events.length === 0}>Undo</Button>
            {isEnded && (
              <>
                <Button p="xs" m="0" fz="xs" component={Link} href={`/session/${sessionId}/stats/`}>View session stats</Button>
              </>
            )}
            {!isEnded && (
              <>
                <Button p="xs" m="0" fz="xs" onClick={handlePauseClick} disabled={isUnstarted}>
                  {isPaused ? 'Unpause' : 'Pause'}
                </Button>
                <Button p="xs" m="0" fz="xs" onClick={handleFixTurnClick} disabled={isPaused || isUnstarted}>Fix turn</Button>
                <Button p="xs" m="0" fz="xs" onClick={handleEndClick} disabled={isPaused || isUnstarted}>End</Button>
              </>
            )}
          </Group>
        )}
        <Title size="md">Current turn</Title>
        <Timer events={events} players={players} sessionPlayers={sessionPlayers} forceShowClock={isFixTurnDialogOpen} />
      </div>
      {isFixTurnDialogOpen && (
        <FixTurnForm
          players={players}
          onCancel={handleFixTurnClick}
          onSubmit={handleFixTurnSubmit}
        />
      )}
      <PlayerParade sessionPlayers={sessionPlayers} events={events} players={players} />
      {!isFixTurnDialogOpen && (
        <div>
          {!events?.length && (<Text>Click to start</Text>)}
          <Button
            onClick={handlePlayerClick(nextTurn.playerId)}
            className={styles.playerButton}
            disabled={isPaused || isEnded}
            size="xl"
            p="lg"
            mt="xl"
          >
            Start turn: {nextTurn.name}
          </Button>
        </div>
      )}
    </div>
  )
}