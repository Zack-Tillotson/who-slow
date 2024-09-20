import { useDataState } from "@/state"
import { Player, Session, SessionPlayer } from "@/state/types"

export type Turn = {
    turn: number,
    time: number,
    player: Player,
    sessionPlayer: SessionPlayer,
}

export type TurnPlayer = {
  player: Player,
  turns: Turn[],
  color: SessionPlayer["color"],
}

export function useSessionStats(session: Session, fullPlayers: Player[]) {
  const {events} = session

  const {getGame} = useDataState()
  const game = getGame(session.game)

  const turns = events.map((event, index) => {
    if(index - 1 < 0) return null

    const prevEvent = events[index-1]
    return {
      turn: index,
      time: event.when - prevEvent.when,
      player: fullPlayers.find(player => player.id == prevEvent.who),
      sessionPlayer: session.sessionPlayers.find(({player}) => player == prevEvent.who)
    }
  }).filter(Boolean) as Turn[]

  const playersWithTurns = session.sessionPlayers.map(sessionPlayer => {
    const player = fullPlayers.find(player => player.id == sessionPlayer.player) as Player
    return {
      player,
      turns: turns.filter(turn => turn.player == player),
      color: sessionPlayer.color,
    }
  }).map(player => ({
    ...player,
    time: player.turns.reduce((time, turn) => time + turn.time, 0),
    turns: player.turns.map((turn, index) => ({...turn, round: index + 1}))
  }))

  const longestTurn = turns.sort((a, b) => b.time - a.time)[0] as Turn
  const shortestTurn = turns.sort((a, b) => a.time - b.time)[0] as Turn
  const slowestPlayer = [...playersWithTurns].sort((a, b) => b.time - a.time)[0] as TurnPlayer

  return {
    players: playersWithTurns,
    game: {
      ...game,
      time: turns.reduce((time, turn) => time + turn.time, 0),
      rounds: playersWithTurns.reduce((max, player) => Math.max(max, player.turns.length), 0),
    },
    highlights: {
      shortestTurn,
      longestTurn,
      slowestPlayer,
    },
  }
}
