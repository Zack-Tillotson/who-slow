'use client'

import Link from "next/link";
import { Button, SimpleGrid, Group, Stack, Text } from "@mantine/core"

import { useDataState } from "@/state";
import { useSessionPlay } from "./useSessionPlay";
import { Timer } from "./timer";
import {FixTurnForm} from './fixTurnForm'

import styles from './sessionPlay.module.scss'

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

  console.log('SessionPlay', session)

  return (
    <div className={styles.container}>
      <Stack mb="xs">
        {!events?.length && (<Text>Click player name to start</Text>)}
        <Timer events={events} players={players} sessionPlayers={sessionPlayers}/>
        {!isFixTurnDialogOpen && (
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
      </Stack>
      {isFixTurnDialogOpen && (
        <FixTurnForm
          players={players}
          onCancel={handleFixTurnClick}
          onSubmit={handleFixTurnSubmit}
        />
      )}
      {!isFixTurnDialogOpen && (
        <SimpleGrid cols={2} className={styles.playerButtons}>
          {sessionPlayers.map(({player: id, color}) => {
            const player = players.find(({id: targetId}) => targetId == id) || {name: '-'}

            return (
              <Button
                key={id}
                bg={isPaused ? '#ccc' : color}
                onClick={handlePlayerClick(id)}
                className={styles.playerButton}
                disabled={isPaused || isEnded}
              >
                {player.name}
              </Button>
            )
          }
          )}
        </SimpleGrid>
      )}
    </div>
  )
}