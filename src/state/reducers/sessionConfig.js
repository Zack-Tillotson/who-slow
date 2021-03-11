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
  return state;
}

export default sessionConfig;