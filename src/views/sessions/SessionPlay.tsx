'use client'

import Link from "next/link";
import { Button, Group, Text, Title } from "@mantine/core"

import { useSessionPlay } from "./useSessionPlay";
import { Timer } from "./timer";
import {FixTurnForm} from './fixTurnForm'
import {ShareForm} from './shareForm'

import styles from './sessionPlay.module.scss'
import { PlayerParade } from "./playerParade";
import { Game, Player } from "@/state/types";

import { useWatchSession } from "@/state/remote/useWatchData";

type ViewProps = {
  sessionId: string,
  game: Game,
  players: Player[],
}

export function SessionPlay({sessionId, game}: ViewProps) {
  const {
    isInitialized,
    data: session,
  } = useWatchSession(sessionId)

  const {
    isPending,
    isUnstarted,
    isEnded,
    isPaused,
    isShareDialogOpen,
    isFixTurnDialogOpen,
    
    nextTurn,

    handlePlayerClick,
    handleShareClick,
    handlePauseClick,
    handleEndClick,
    handleUndoClick,
    handleFixTurnClick,
    handleFixTurnSubmit,
  } = useSessionPlay(session, game)

  if(!isInitialized) {
    return `Loading....`
  }

  if(!session) {
    return (
      <h1>Error: session not found</h1>
    )
  }

  const {events = [], sessionPlayers} = session

  return (
    <div className={styles.container}>
      {isShareDialogOpen && (
        <ShareForm
          sessionId={session.id}
          onClose={handleShareClick}
        />
      )}
      {!isShareDialogOpen && (
        <div>
          {!isUnstarted && !isFixTurnDialogOpen && (
            <div>
              <Group gap="xs">
                <Button
                  p="xs"
                  m="0"
                  fz="xs"
                  onClick={handleShareClick}
                >
                  Share
                </Button>
                <Button
                  p="xs"
                  m="0"
                  fz="xs"
                  onClick={handleUndoClick}
                  disabled={isPending || isPaused || events.length === 0}
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
              <Title size="md">Current turn</Title>
              <Timer events={events} players={session.sessionPlayers} forceShowClock={isFixTurnDialogOpen} />
            </div>
          )}
          {isFixTurnDialogOpen && (
            <FixTurnForm
              players={session.sessionPlayers}
              onCancel={handleFixTurnClick}
              onSubmit={handleFixTurnSubmit}
            />
          )}
          <PlayerParade players={sessionPlayers} events={events} />
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
      )}
    </div>
  )
}