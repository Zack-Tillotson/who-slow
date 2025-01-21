import { SessionEvent, SessionPlayer } from "@/state/types";

export function usePlayerParade(
  events: SessionEvent[],
  players: SessionPlayer[],
) {
  
  const allTurns = events.filter(({type}) => type === 'TURN_START')
  const firstTurnNumber = allTurns.length
  const turns = new Array(10).fill(0).map((_, index) => {
    const turnNumber = firstTurnNumber + index
    const sessionPlayerIndex = turnNumber % players.length
    const sessionPlayer = players[sessionPlayerIndex]
    return {
      turnNumber: Math.max(0, turnNumber),
      name: sessionPlayer?.name ?? '',
      color: sessionPlayer?.color ?? '',
    }
  })
  
  return {
    turns
  }
}
