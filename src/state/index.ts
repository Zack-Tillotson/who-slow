'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { 
  Game,
  Player,
  Campaign,
  DataState,
} from './types'

export const useDataState = create<DataState, [["zustand/persist", { campaigns: Campaign[]; }]] >(
  persist(
    (set, get) => ({
      games: [],
      players: [],
      campaigns: [{
        id: 0,
        name: '',
      }],
      sessions: [],

      isInitialized: false,
      isLoading: false,
      isError: false,

      // Campaigns ////////////////////////////////////////////////////////////////////////

      getCampaign(stringId: string) {
        const campaign = get().getCampaigns().find(({id}) => id === Number(stringId))
        return campaign
      },

      getCampaigns() {
        return get().campaigns
      },

      saveCampaign(campaign: Campaign) {
        // TODO validate campaign

        const {getCampaigns} = get()
        const campaigns = getCampaigns()
        
        // Update ID as needed
        if(campaign.id < 0) {
          campaign.id = campaigns.length
        }

        const updatedCampaigns = [...campaigns]

        // Add to state
        const existingIndex = campaigns.findIndex(({id}) => id === campaign.id)
        if(existingIndex < 0) {
          updatedCampaigns.push(campaign)
        } else {
          updatedCampaigns[existingIndex] = campaign
        }
        
        set({
          campaigns: updatedCampaigns,
        })

        return campaign
      },

      getCampaignForm(stringId?: string) {
        if(stringId) {
          const campaign = get().getCampaign(stringId)
          if(campaign) {
            return campaign
          }
        }

        return {
          id: -1,
          name: '',
        }
      },

      // Games ////////////////////////////////////////////////////////////////////////

      getGame(stringId: string) {
        const game = get().getGames().find(({bggId}) => bggId === Number(stringId))
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

      getGameForm(stringId?: string) {
        if(stringId) {
          const game = get().getGame(stringId)
          if(game) {
            return game
          }
        }

        return {
          bggId: -1,
          name: '',
        }
      },

      // Players /////////////////////////////////////////////////////////////////////////

      getPlayer(stringId: string) {
        const player = get().getPlayers().find(({id}) => id === Number(stringId))
        return player
      },

      getPlayers() {
        return get().players
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
    }),
    {
      name: 'who-slow-app-data',
      partialize: ({campaigns, players, games}) => ({campaigns, players, games}),
      skipHydration: true,
    }
  )
)