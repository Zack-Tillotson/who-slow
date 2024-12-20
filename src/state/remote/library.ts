import { collection, getDocs, query, where, getDoc, doc, setDoc, and } from "firebase/firestore"
import { FirebaseConnection } from "../firebase"
import { Campaign, Game, Player, Session } from "../types"

import { buildCampaign } from "./objects/campaign"
import { buildSession } from "./objects/session"
import { buildPlayer } from "./objects/player"

export async function getUid(firebase: FirebaseConnection) {
  await firebase.getAuth().authStateReady()
  const uid = firebase.getAuth().currentUser?.uid
  return uid
}

export async function getCampaigns(firebase: FirebaseConnection): Promise<Campaign[]> {
  const uid = await getUid(firebase)

  const q = query(collection(firebase.getDB(), 'campaigns'), where('owner', '==', uid))
  const queryDocs = await getDocs(q)

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
  const queryDocs = await getDocs(q)

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

export async function getCampaignSessions(firebase: FirebaseConnection, campaignId: string) {
  const uid = await getUid(firebase)

  const q = query(
    collection(firebase.getDB(), 'sessions'), 
    and(where('owner', '==', uid), where('campaign', '==', campaignId))
  )
  const queryDocs = await getDocs(q)

  const list: Session[] = []
  queryDocs.forEach(doc => list.push(buildSession(doc.id, doc.data())))
  
  return list
}

export function libraryFactory(firebase: FirebaseConnection) {
  return {
    getCampaigns: () => getCampaigns(firebase),
    getCampaign: (id: string) => getCampaign(firebase, id),
    saveCampaign: (campaign: Campaign) => saveCampaign(firebase, campaign),

    getPlayers: () => getPlayers(firebase),
    getPlayer: (id: string) => getPlayer(firebase, id),
    savePlayer: (player: Player) => savePlayer(firebase, player),
    
    getCampaignSessions: (id: string) => getCampaignSessions(firebase, id),
  }
}