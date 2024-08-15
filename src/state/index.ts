'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { 
  Game,
  Player,
  Campaign,
  Session,

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

      getCampaign(targetId: string|number) {
        const campaign = get().getCampaigns().find(({id}) => id === Number(targetId))
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

      getCampaignSessions(campaignId: number) {
        const campaign = get().getCampaign(campaignId)
        if(!campaign) return []

        const sessions = get().getSessions().filter(session => session.campaign == campaignId)

        return sessions
      },

      // Games ////////////////////////////////////////////////////////////////////////

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

      removeGame: (stringId: string|number) => {
        const gameSessions = get().getSessions().filter(({game}) => game == stringId)

        if(gameSessions.length) {
          return false
        }

        const games = get().getGames().filter(({bggId}) => bggId != stringId)
        set({games})

        return true
      },

      // Players /////////////////////////////////////////////////////////////////////////

      getPlayer(stringId: string|number) {
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

      // Sessions ////////////////////////////////////////////////////////////////////////

      getSession(stringId: string | number) {
        const session = get().getSessions().find(({id}) => id === Number(stringId))
        return session
      },

      getSessions() {
        return get().sessions
      },

      saveSession(session: Session) {
        // TODO validate

        const {getSessions} = get()
        const sessions = getSessions()
        
        // Update ID as needed
        if(typeof session.id === 'string') session.id = Number(session.id)
        if(session.id < 0) {
          session.id = sessions.length
        }

        // Add events as needed
        if(!session.events) {
          session.events = []
        }

        const updatedSessions = [...sessions]

        // Add to state
        const existingIndex = sessions.findIndex(({id}) => id === session.id)
        if(existingIndex < 0) {
          updatedSessions.push(session)
        } else {
          updatedSessions[existingIndex] = session
        }
        
        set({
          sessions: updatedSessions,
        })

        return session
      },

      getSessionForm(stringId = '-1', campaignId = '-1') {
        if(stringId && stringId != '-1') {
          const session = get().getSession(stringId)
          if(session) {
            return session
          }
        }

        return {
          id: -1,
          date: new Date().toString(),
          status: 'PRE',
          campaign: Number(campaignId),
          game: -1,
          sessionPlayers: [],
        }
      },
      getSessionStatusText(status: string) {
        switch(status) {
          case 'PRE':
            return 'Not started'
          case 'IN':
            return 'In progress'
          case 'PAUSE':
            return 'Paused'
          case 'POST':
            return 'Game complete'
          default:
            return 'Unknown'
        }
      },
    }),
    {
      name: 'who-slow-app-data',
      partialize: ({
        campaigns,
        players,
        games,
        sessions,
      }) => ({
        campaigns,
        players,
        games,
        sessions,
      }),
      skipHydration: true,
    }
  )
)