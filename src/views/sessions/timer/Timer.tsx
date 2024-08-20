import React, {useState, useEffect} from 'react';

import styles from './timer.module.scss'
import { Player, SessionEvent, SessionPlayer } from '@/state/types';
import { useTimer } from './useTimer';

export interface TimerProps {
  events: SessionEvent[],
  players: Player[],
  sessionPlayers: SessionPlayer[],
}

export function Timer({events, players, sessionPlayers}: TimerProps) {

  const {
    isClockVisible,
    currentPlayer,
    clock,
    roundCount,
    turnCount,
    borderColor,

    handleClick,
  } = useTimer(events, players, sessionPlayers)

  return (
    <div
      className={`${styles.timer} ${!isClockVisible && styles.timerNoClock}`}
      style={{borderColor}}
      onClick={handleClick}
    >
      <div className={styles.timerPlayer}>{currentPlayer?.name ?? '-'}</div>
      <div className={styles.timerClock}>{clock}</div>
      <div className={styles.timerRound}>{roundCount ? `Round ${roundCount}` : '-'}</div>
      <div className={styles.timerTurn}>{turnCount ? `Turn ${turnCount}` : '-'}</div>
    </div>
  );
}
