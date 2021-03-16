import types from '../types'

const INITIAL = {
  status: {
    isInitializing: true,
    isInitialized: false,    
  },
  players: [],
  game: null,
}

function session(state = INITIAL, action) {
  switch(action.type) {
    case types.dbDataLoaded: {

      if(action.payload.path !== 'sessions' || !action.payload.params) return state

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

export default session