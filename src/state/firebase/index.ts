import { FirebaseApp, FirebaseOptions, initializeApp, initializeServerApp } from "firebase/app"
import { Firestore, getFirestore } from "firebase/firestore"
import { Auth, getAuth } from "firebase/auth"

import {config} from './firebase.config'

export type FirebaseOptionsParams = {
  idToken?: string,
}

export class FirebaseConnection {
  public isInitialized = false

  private options: FirebaseOptions
  private idToken: string = ''
  private app: FirebaseApp | null = null
  private db: Firestore | null = null
  private auth: Auth | null = null

  constructor(options: FirebaseOptions, {idToken}: FirebaseOptionsParams = {}) {
    this.options = options
    if(idToken) {
      this.idToken = idToken
    }
  }

  private isConnected() {
    if(!this.app) return false
    return true
  }

  isServer() {
    return !!this.idToken
  }

  getApp() {
    if(!this.app) {
      if(this.isServer()) {
        this.app = initializeServerApp(this.options, {
          authIdToken: this.idToken,
        })
      } else {
        this.app = initializeApp(this.options)
      }
    }
    return this.app
  }

  getDB() {
    const app = this.getApp()
    if(!this.db) {
      this.db = getFirestore(app)
    }

    return this.db
  }
  
  getAuth() {
    const app = this.getApp()
    if(!this.auth) {
      this.auth = getAuth(app)
    }

    return this.auth
  }
}

// XXX This is implicit persistent state
//
// This is invoked with an idToken parameter early in the server
// flow for a request, and then that auth state is persisted for 
// the rest of the request.
// 
// Is there a better way to handle this, perhaps inverting flow 
// of control?
let connection: FirebaseConnection;
export default (idToken?: string) => {
  if(!connection || idToken) {
    connection = new FirebaseConnection(config, {idToken})
  }
  return connection
}