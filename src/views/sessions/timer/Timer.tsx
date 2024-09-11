import React, {useState, useEffect} from 'react';

import styles from './timer.module.scss'
import { Player, SessionEvent, SessionPlayer } from '@/state/types';
import { useTimer } from './useTimer';

export interface TimerProps {
  events: SessionEvent[],
  players: Player[],
  sessionPlayers: SessionPlayer[],
  forceShowClock: boolean,
}

export function Timer({events, players, sessionPlayers, forceShowClock = false}: TimerProps) {

  const {
    isClockVisible,
    currentPlayer,
    clock,
    roundCount,
    roundTurnCount,
    borderColor,

    handleClick,
  } = useTimer(events, players, sessionPlayers)

  const showClock = isClockVisible || forceShowClock

  return (
    <div
      className={`${styles.timer} ${!showClock && styles.timerNoClock}`}
      style={{borderColor}}
      onClick={handleClick}
    >
      <div className={styles.timerPlayer}>{currentPlayer?.name ?? '-'}</div>
      <div className={styles.timerClock}>{clock}</div>
      <div className={styles.timerRound}>{roundCount ? `Round ${roundCount}` : '-'}</div>
      <div className={styles.timerTurn}>{roundTurnCount ? `Turn ${roundTurnCount} of ${players.length}` : `${players.length} players`}</div>
    </div>
  );
}
