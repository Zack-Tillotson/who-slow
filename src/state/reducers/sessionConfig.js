import types from '../types'

const INITIAL = {
  status: {
    isInitializing: false,
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
        ...action.payload,
      }
    }
  }
  return state;
}

export default sessionConfig;