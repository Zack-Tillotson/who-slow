import types from '../types'

const INITIAL = {
  status: {
    isInitializing: true,
    isInitialized: false,    
  },
  players: [],
  games: [],
  sessions: [],
}

function sessionConfig(state = INITIAL, action) {
  switch(action.type) {
    case types.dbDataLoaded: {
      return {
        ...state,
        status: {
          isInitialized: true,
          isInitializing: false,
        },
        ...action.payload,
      }
    }
  }
  return state;
}

export default sessionConfig;