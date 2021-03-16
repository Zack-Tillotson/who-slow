import types from '../types'

const INITIAL = {
  status: {
    isInitializing: true,
    isInitialized: false,    
  },
  players: [],
  games: [],
  sessions: [],
  newSessionForm: {
    game: '',
    players: [],
  },
}

function sessionConfig(state = INITIAL, action) {
  switch(action.type) {
    case types.dbDataLoaded: {
      
      if(action.payload.path !== 'initialize') return state

      return {
        ...state,
        status: {
          isInitialized: true,
          isInitializing: false,
        },
        ...action.payload.data,
      }
    }
  }
  return state;
}

export default sessionConfig;