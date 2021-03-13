import GAMES from './data/games'
import PLAYERS from './data/players'

const DB_VERSION = 1;
const DB_NAME = 'why-slow-local'

function openDb() {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(DB_NAME, DB_VERSION)

    openRequest.onupgradeneeded = function(event) {
      let db = openRequest.result;
      switch(event.oldVersion) {
        case 0: // No existing DB
          return createBaseDb(db);
      }
    };

    openRequest.onerror = function() {
      reject(openRequest.error)
    }

    openRequest.onsuccess = function() {
      resolve(openRequest.result)
    }
  })
}

function loadBaseData(db, storeName, data) {
  const transaction = db.transaction(storeName, 'readwrite')
  const store = transaction.objectStore(storeName)

  data.forEach(item => {
    let request = store.add(item);
  })
}

async function getData(storeName) {
  const db = await openDb()
  const transaction = db.transaction(storeName)
  const store = transaction.objectStore(storeName)
  const request = store.getAll()
  return new Promise(resolve => {
    request.onsuccess = () => {
      resolve(request.result)
    }
  })
}

function createBaseDb(db) {
  db.createObjectStore(db, 'games', {keyPath: 'id', autoIncrement: true});
  db.createObjectStore(db, 'players', {keyPath: 'id', autoIncrement: true});
  db.createObjectStore(db, 'sessions', {keyPath: 'id', autoIncrement: true});
}

async function initialize() {
  
  const db = await openDb();

  await Promise.all([
    loadBaseData(db, 'games', GAMES),
    loadBaseData(db, 'players', PLAYERS),
  ])

  const [games, players, sessions] = await Promise.all([getData('games'), getData('players'), getData('sessions')])
  return {
    games,
    players,
    sessions,
  }
}

export default {initialize}