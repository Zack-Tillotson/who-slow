const id = 'source-hardcoded'
/*
data name = [
  games
  players
  sessions
  session
]
*/

const GAMES = [
  {id: 1, name: 'Pandemic'},
  {id: 2, name: 'Clank!'},
]

const PLAYERS = [
  {id: 1, name: 'Zack'},
  {id: 2, name: 'Tanya'},
]

const SESSIONS = []

// Must return object which 
// 1. Fetches data
// 1. Invokes given onData callback with lifecycle updates
// 2. Has dispose function to allow for disposal of in-flight requests
function request(name, onData) {
  let value;
  switch(true) {
    case (name === 'games'): {
      value = GAMES;
    }
    break;
    case (name === 'players'): {
      value = PLAYERS;
    }
    break;
    case (name === 'sessions'): {
      value = SESSIONS;
    }
    break;
    case (name.startsWith('session/')): {
      const id = name.split('session/')[1];
      value = {isSession: true, id}; // TODO fill out
    }
    break;
    default:
      value = false;
      break;
  }

  const result = {
    isLoaded: true,
    isLoading: false,
    isError: false,
    value,
    error: null,
  }

  onData(name, id, result)

  return {
    ...result,
    dispose: () => {},
  }
}

export default {
  id,
  request,
}