'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { 
  Campaign,
  DataState,
} from './types'

import campaign from './campaign'
import game from './game'
import player from './player'
import session from './session'

export const useDataState = create<DataState, [["zustand/persist", { campaigns: Campaign[]; }]] >(
  persist(
    (set, get) => ({
      games: [],
      players: [],
      campaigns: [{
        id: 0,
        name: 'Just play',
      }],
      sessions: [],

      isInitialized: false,
      isLoading: false,
      isError: false,

      ...campaign(get, set),
      ...game(get, set),
      ...player(get, set),
      ...session(get, set),
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