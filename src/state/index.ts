'use client'

import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools';

import { 
  DataState,
  Campaign,
  Game,
  Session,
  Player,
  SessionForm,
} from './types'

export const useDataState = create<DataState>(
  (set, get) => ({
    isInitialized: false,
    isLoading: false,
    isError: false,

    getCampaignForm(campaign?: Campaign) {
      if(campaign) {
        return {...campaign}
      }

      return {
        id: '',
        name: '',
      }
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
    getPlayerForm(player?: Player) {
      if(player) {
        return {...player}
      }

      return {
        id: '',
        name: '',
      }
    },
    
    getSessionForm(players: Player[], campaignId?: Campaign["id"], session?: Session) {
      if(session) {
        const builtPlayers = session.sessionPlayers
          .map((sessionPlayer, index) => {
            const player = players.find(player => player.id == sessionPlayer.player)
            return ({
              player: player?.name ?? '', 
              color: session.sessionPlayers[index].color,
            })
          })
        return {
          id: session.id,
          campaign: session.campaign,
          game: session.game,
          players: builtPlayers,
        }
      }

      return {
        id: '',
        campaign: campaignId || '',
        game: '',
        players: [],
      }
    },
  })
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Data state', useDataState);
}
