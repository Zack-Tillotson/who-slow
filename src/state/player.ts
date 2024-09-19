import { 
  Player,
  SessionPlayer,
  DataState,
} from './types'

export default function playerState(get: () => DataState, set: (state: Partial<DataState>) => void) {
  return {
    getPlayer(stringId: string|number) {
      const player = get().getPlayers().find(({id}) => id === Number(stringId))
      return player
    },

    // Returns all players (if no param) or players with ids represented in targetPlayers
    getPlayers(targetPlayers?: SessionPlayer[]): Player[] {
      const rawPlayers = get().players
      if(!targetPlayers) {
        return rawPlayers
      }
      return targetPlayers
        .map(({player}) => rawPlayers.find(({id}) => player === id))
        .filter(player => !!player)
    },

    savePlayer(player: Player) {
      // TODO validate

      const {getPlayers} = get()
      const players = getPlayers()
      
      // Update ID as needed
      if(player.id < 0) {
        player.id = players.length
      }

      const updatedPlayers = [...players]

      // Add to state
      const existingIndex = players.findIndex(({id}) => id === player.id)
      if(existingIndex < 0) {
        updatedPlayers.push(player)
      } else {
        updatedPlayers[existingIndex] = player
      }
      
      set({
        players: updatedPlayers,
      })

      return player
    },

    getPlayerForm(stringId?: string) {
      if(stringId) {
        const player = get().getPlayer(stringId)
        if(player) {
          return player
        }
      }

      return {
        id: -1,
        name: '',
      }
    },
  }
}