import { collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { FirebaseConnection } from "./firebase";
import { Campaign, Game } from "../types";
import { buildCampaign } from "./objects/campaign";


export async function getCampaigns(firebase: FirebaseConnection) {
  const games: Campaign[] = []
  
  const q = collection(firebase.getDB(), 'campaigns')
  const queryDocs = await getDocs(q)
  queryDocs.forEach(doc => games.push(buildCampaign(doc.id, doc.data())))
  
  return games
}

export function libraryFactory(firebase: FirebaseConnection) {
  return {
    getCampaigns: () => getCampaigns(firebase)
  }
}