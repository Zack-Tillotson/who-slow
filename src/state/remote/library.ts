import { collection, getDocs, query, where, getDoc, doc, setDoc, and, limit, serverTimestamp, updateDoc, onSnapshot } from "firebase/firestore"
import { FirebaseConnection } from "../firebase"
import { Campaign, FilledSession, Game, Player, Session, SessionConfig, SessionPlayer } from "../types"

import { buildCampaign } from "./objects/campaign"
import { buildSession, generateShareCode } from "./objects/session"
import { buildPlayer } from "./objects/player"
import { buildGame } from './objects/game'

export async function getUid(firebase: FirebaseConnection) {
  await firebase.getAuth().authStateReady()
  const uid = firebase.getAuth().currentUser?.uid ?? ''
  if(!uid) {
    console.log('WARNING', 'getUid', 'user not authenticated')
  }
  return uid
}

export async function getCampaigns(firebase: FirebaseConnection): Promise<Campaign[]> {
  const uid = await getUid(firebase)

  const q = query(collection(firebase.getDB(), 'campaigns'), where('owner', '==', uid))
  let queryDocs
  try {
    queryDocs = await getDocs(q)
  } catch(e) {
    console.log("Error", "getCampaigns", e)
    throw e
  }

  const list: Campaign[] = []
  queryDocs.forEach(doc => list.push(buildCampaign(doc.id, doc.data())))
  
  return list
}

export async function getCampaign(firebase: FirebaseConnection, id: string): Promise<Campaign> {  
  const q = doc(firebase.getDB(), 'campaigns', id)
  const qDoc = await getDoc(q)

  return buildCampaign(id, qDoc.data())
}

export async function saveCampaign(firebase: FirebaseConnection, campaign: Campaign): Promise<Campaign> {

  const {id, ...attrs} = campaign
  const dbDoc = {...attrs, owner: await getUid(firebase)}

  let docRef;
  if(id) {
    docRef = doc(firebase.getDB(), 'campaigns', id)
  } else {
    docRef = doc(collection(firebase.getDB(), 'campaigns'))
  }

  await setDoc(docRef, dbDoc)
  return buildCampaign(docRef.id, dbDoc)
}


export async function getPlayers(firebase: FirebaseConnection): Promise<Player[]> {
  const uid = await getUid(firebase)

  const q = query(collection(firebase.getDB(), 'players'), where('owner', '==', uid))
  let queryDocs
  try {
    queryDocs = await getDocs(q)
  } catch(e) {
    console.log("Error", "getPlayers", e)
    throw e
  }

  const list: Player[] = []
  queryDocs.forEach(doc => list.push(buildPlayer(doc.id, doc.data())))
  
  return list
}

export async function getPlayer(firebase: FirebaseConnection, id: string): Promise<Player> {  
  const q = doc(firebase.getDB(), 'players', id)
  const qDoc = await getDoc(q)

  return buildPlayer(id, qDoc.data())
}

export async function savePlayer(firebase: FirebaseConnection, player: Player): Promise<Player> {

  const {id, ...attrs} = player
  const dbDoc = {...attrs, owner: await getUid(firebase)}

  let docRef;
  if(id) {
    docRef = doc(firebase.getDB(), 'players', id)
  } else {
    docRef = doc(collection(firebase.getDB(), 'players'))
  }

  await setDoc(docRef, dbDoc)
  return buildPlayer(docRef.id, dbDoc)
}


export async function getGames(firebase: FirebaseConnection): Promise<Game[]> {
  const q = query(collection(firebase.getDB(), 'games'), limit(100))
  
  let queryDocs
  try {
    queryDocs = await getDocs(q)
  } catch(e) {
    console.log("Error", "getGames", e)
    throw e
  }

  const list: Game[] = []
  queryDocs.forEach(doc => list.push(buildGame(doc.id, doc.data())))
  
  return list
}

export async function getGame(firebase: FirebaseConnection, id: string): Promise<Game> {  
  const q = doc(firebase.getDB(), 'games', id)
  const qDoc = await getDoc(q)

  return buildGame(id, qDoc.data())
}

export async function saveGame(firebase: FirebaseConnection, game: Game): Promise<Game> {

  const {id, ...attrs} = game
  const dbDoc = {...attrs}

  let docRef;
  if(id) {
    docRef = doc(firebase.getDB(), 'games', id)
  } else {
    docRef = doc(collection(firebase.getDB(), 'games'))
  }

  await setDoc(docRef, dbDoc)
  return buildGame(docRef.id, dbDoc)
}

export async function getCampaignSessions(firebase: FirebaseConnection, campaignId: string) {
  const uid = await getUid(firebase)

  const q = query(
    collection(firebase.getDB(), 'sessions'), 
    and(where('owner', '==', uid), where('campaign', '==', campaignId))
  )
  const queryDocs = await getDocs(q)

  const list: Session[] = []
  queryDocs.forEach(doc => list.push(buildSession(doc.id, doc.data())))
  
  const campaignSessions = []
  for(let i = 0 ; i < list.length ; i++) {
    campaignSessions.push(await getFilledSession(firebase, list[i].id))
  } 
  return campaignSessions
}

export async function getSession(firebase: FirebaseConnection, id: string): Promise<Session> {  
  const q = doc(firebase.getDB(), 'sessions', id)
  const qDoc = await getDoc(q)

  return buildSession(id, qDoc.data())
}

export async function getFilledSession(firebase: FirebaseConnection, id: string): Promise<FilledSession> {  
  const session = await getSession(firebase, id)
  const game = await getGame(firebase, session.game)
  const players = await getSessionPlayers(firebase, session)
  return {
    session,
    game,
    players,
  }
}

export async function getSessionPlayers(firebase: FirebaseConnection, session: Session): Promise<Player[]> {  
  try {

    const players = []
    for(let i = 0; i < session.sessionPlayers.length; i++) {
      players.push(await getPlayer(firebase, session.sessionPlayers[i].player))
    }
    return players
  } catch(e) {
    return []
  }
}

export async function getSessionShareCode(firebase: FirebaseConnection, sessionId: string): Promise<string> {  
  const q = doc(firebase.getDB(), 'shareCodes', sessionId)
  const qDoc = await getDoc(q)
  
  if(qDoc.exists()) {
    const code = qDoc.data().code
    if(code) {
      return code
    }
  }

  const code = generateShareCode()

  try {
    await setDoc(doc(firebase.getDB(), 'shareCodes', sessionId), {code})
  } catch(e) { console.log('Error', 'getSessionShareCode', 'shareCodes', e)}

  try {
    await setDoc(doc(firebase.getDB(), 'shareIds', code), {sessionId})
  } catch(e) { console.log('Error', 'getSessionShareCode', 'shareIds', e)}

  try {
    await setAttribute(firebase, `sessions/${sessionId}`, 'shared', true)
  } catch(e) { console.log('Error', 'getSessionShareCode', 'session shared attr', e)}

  return code
}

export async function getSessionIdFromShareCode(firebase: FirebaseConnection, id: string): Promise<string> {  
  const q = doc(firebase.getDB(), 'shareIds', id)
  const qDoc = await getDoc(q)
  
  return qDoc.data()?.sessionId
}

export async function ensureSessionPlayers(
  firebase: FirebaseConnection,
  rawSessionPlayers: SessionPlayer[]
): Promise<SessionPlayer[]> {
  const sessionPlayers = []
  for(let i = 0 ; i < rawSessionPlayers.length; i++) {
    const {player, name, color} = rawSessionPlayers[i]
    if(player) {
      sessionPlayers.push({name, color, player})
      continue
    }

    const {id} = await savePlayer(firebase, {id: '', name})
    sessionPlayers.push({name, color, player: id})
  }
  return sessionPlayers
}

export async function saveSessionConfig(firebase: FirebaseConnection, config: SessionConfig) {

  const {id, sessionPlayers: rawSessionPlayers, ...attrs} = config

  const sessionPlayers = await ensureSessionPlayers(firebase, rawSessionPlayers)

  const dbDoc = {
    ...attrs,
    sessionPlayers,
    owner: await getUid(firebase),
    events: [],
  }

  let docRef;
  if(id) {
    docRef = doc(firebase.getDB(), 'sessions', id)
  } else {
    docRef = doc(collection(firebase.getDB(), 'sessions'))
  }

  await setDoc(docRef, dbDoc)
  await updateDoc(docRef, {date: serverTimestamp()})

  const queryDoc = (await getDoc(docRef)).data()
  return buildSession(docRef.id, queryDoc)
}

export function watchData<T>(firebase: FirebaseConnection, objectBuilder: (id?: string, data?: Object) => T, path: string, dataCallback: (data: T) => void) {
  const docRef = doc(firebase.getDB(), path)
  return onSnapshot(docRef, doc => {
    const data = objectBuilder(doc.id, doc.data())
    dataCallback(data)
  })
}

export function setAttribute(firebase: FirebaseConnection, docPath: string, attrPath: string, value: any) {
  const docRef = doc(firebase.getDB(), docPath)
  return setDoc(docRef, {[attrPath]: value}, { merge: true })
}

export function libraryFactory(firebase: FirebaseConnection) {
  return {
    ensureAuth: () => getUid(firebase),
    
    getCampaigns: () => getCampaigns(firebase),
    getCampaign: (id: string) => getCampaign(firebase, id),
    saveCampaign: (campaign: Campaign) => saveCampaign(firebase, campaign),

    getPlayers: () => getPlayers(firebase),
    getPlayer: (id: string) => getPlayer(firebase, id),
    savePlayer: (player: Player) => savePlayer(firebase, player),

    getGames: () => getGames(firebase),
    getGame: (id: string) => getGame(firebase, id),
    saveGame: (game: Game) => saveGame(firebase, game),
    
    getCampaignSessions: (id: string) => getCampaignSessions(firebase, id),

    getSession: (id: string) => getSession(firebase, id),
    getFilledSession: (id: string) => getFilledSession(firebase, id),
    getSessionPlayers: (session: Session) => getSessionPlayers(firebase, session),
    saveSessionConfig: (session: SessionConfig) => saveSessionConfig(firebase, session),
    
    getSessionShareCode: (id: string) => getSessionShareCode(firebase, id),
    getSessionIdFromShareCode: (id: string) => getSessionIdFromShareCode(firebase, id),

    watchData: <T>(path: string, objectBuilder: () => T, dataCallback: (data: T) => void) => 
      watchData<T>(firebase, objectBuilder, path, dataCallback),
    setAttribute: (docPath: string, attrPath: string, value: any) => 
      setAttribute(firebase, docPath, attrPath, value),
  }
}