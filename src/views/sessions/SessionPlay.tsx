'use client'

import Link from "next/link";
import { Button, Group, Text, Title } from "@mantine/core"

import { useSessionPlay } from "./useSessionPlay";
import { Timer } from "./timer";
import {FixTurnForm} from './fixTurnForm'

import styles from './sessionPlay.module.scss'
import { PlayerParade } from "./playerParade";
import { Game, Player } from "@/state/types";

import { useWatchSession } from "@/state/remote/useWatchData";

type ViewProps = {
  sessionId: string,
  game: Game,
  players: Player[],
}

export function SessionPlay({sessionId, game, players}: ViewProps) {
  const {
    isInitialized,
    data: session,
  } = useWatchSession(sessionId)

  const {
    isPending,
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
  } = useSessionPlay(session, game, players)

  if(!isInitialized) {
    return `Loading....`
  }

  if(!session) {
    return (
      <h1>Error: session not found</h1>
    )
  }

  const {events, sessionPlayers} = session

  return (
    <div className={styles.container}>
      <div>
        {!isUnstarted && !isFixTurnDialogOpen && (
          <Group gap="xs">
            <Button
              p="xs"
              m="0"
              fz="xs"
              onClick={handleUndoClick}
              disabled={isPending || isPaused || session.events.length === 0}
            >
              Undo
            </Button>
            {isEnded && (
                <Button
                  p="xs"
                  m="0"
                  fz="xs"
                  component={Link}
                  href={`/session/${session.id}/stats/`}
                >
                  View session stats
                </Button>
            )}
            {!isEnded && (
              <>
                <Button p="xs" m="0" fz="xs" onClick={handlePauseClick} disabled={isPending || isUnstarted}>
                  {isPaused ? 'Unpause' : 'Pause'}
                </Button>
                <Button p="xs" m="0" fz="xs" onClick={handleFixTurnClick} disabled={isPending || isPaused || isUnstarted}>Fix turn</Button>
                <Button p="xs" m="0" fz="xs" onClick={handleEndClick} disabled={isPending || isPaused || isUnstarted}>End</Button>
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
            disabled={isPending || isPaused || isEnded}
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