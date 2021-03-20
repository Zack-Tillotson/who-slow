import types from '../types'

const INITIAL = {
  status: {
    isInitializing: true,
    isInitialized: false,    
  },
  players: [],
  game: null,
  events: [],
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

    case types.stateValueUpdated: {
      if(!action.payload.path.startsWith('session/')) return state

      return {
        ...state,
        [action.payload.path.substring('session/'.length)]: action.payload.value,
      }
    }
  }
  return state;
}

export default session