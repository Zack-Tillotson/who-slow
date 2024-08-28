import { Player, SessionEvent, SessionPlayer } from "@/state/types";

export function usePlayerParade(
  events: SessionEvent[],
  players: Player[],
  sessionPlayers: SessionPlayer[],
) {
  
  const allTurns = events.filter(({type}) => type === 'TURN_START')
  const firstTurnNumber = allTurns.length
  const turns = new Array(10).fill(0).map((_, index) => {
    const turnNumber = firstTurnNumber + index
    const sessionPlayerIndex = turnNumber % sessionPlayers.length
    const sessionPlayer = sessionPlayers[sessionPlayerIndex]
    const player = players.find(player => player.id == sessionPlayer?.player)
    return {
      turnNumber: Math.max(0, turnNumber),
      name: player?.name ?? '',
      color: sessionPlayer?.color ?? '',
    }
  })
  
  return {
    turns
  }
}
