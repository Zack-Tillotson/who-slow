import { 
  Game,
  DataState,
} from './types'

export default function gameState(get: () => DataState, set: (state: Partial<DataState>) => void) {
  return {
    getGame(stringId: string|number) {
      const game = get().getGames().find(({bggId}) => bggId == Number(stringId))
      return game
    },

    getGames() {
      return get().games
    },

    saveGame(game: Game) {
      // TODO validate

      const {getGames} = get()
      const games = getGames()
      
      // Update ID as needed
      if(typeof game.bggId === 'string') game.bggId = Number(game.bggId)
      if(game.bggId < 0) {
        game.bggId = games.length
      }

      const updatedGames = [...games]

      // Add to state
      const existingIndex = games.findIndex(({bggId}) => bggId === game.bggId)
      if(existingIndex < 0) {
        updatedGames.push(game)
      } else {
        updatedGames[existingIndex] = game
      }
      
      set({
        games: updatedGames,
      })

      return game
    },

    getGameForm(game?: Game) {
      if(game) {
        return {...game}
      }

      return {
        id: '',
        name: '',
        yearPublished: 0,
        image: '',
      }
    },

    removeGame: (stringId: string|number) => {
      const gameSessions = get().getSessions().filter(({game}) => game == stringId)

      if(gameSessions.length) {
        return false
      }

      const games = get().getGames().filter(({bggId}) => bggId != stringId)
      set({games})

      return true
    },
  }
}