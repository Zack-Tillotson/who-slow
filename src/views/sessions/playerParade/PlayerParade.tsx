import React, {useState, useEffect} from 'react';

import styles from './playerParade.module.scss'
import { Player, SessionEvent, SessionPlayer } from '@/state/types';
import { Group, Stack, Text, Title } from '@mantine/core';
import { usePlayerParade } from './usePlayerParade';

export interface PlayerParadeProps {
  events: SessionEvent[],
  players: Player[],
  sessionPlayers: SessionPlayer[],
}

export function PlayerParade({events, sessionPlayers, players}: PlayerParadeProps) {

  const {
    turns,
  } = usePlayerParade(events, players, sessionPlayers)

  return (
    <div>
      <Title size="xs">Upcoming turns</Title>
      <Group className={styles.turnContainer} wrap="nowrap" gap="0" grow>
        {turns.map(({turnNumber, name, color}) => (
          <Stack key={turnNumber} className={styles.turn} pt="xl" pb="xl" ta="center">
            <Text className={styles.turnName}>{name}</Text>
            <div className={styles.turnBgTop} style={{backgroundColor: color}}>&nbsp;</div>
            <div className={styles.turnBgBot} style={{backgroundColor: color}}>&nbsp;</div>
          </Stack>
        ))}
      </Group>
      </div>
  );
}
