import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { collection, Firestore, getFirestore, onSnapshot, query } from "firebase/firestore";

export enum WatchTypes {
  Games = 'games',
}

export class FirebaseConnection {
  public isInitialized = false
  public watchTypes = WatchTypes 

  private options: FirebaseOptions
  private app: FirebaseApp | null = null
  private db: Firestore | null = null

  constructor(options: FirebaseOptions) {
    this.options = options
  }

  private isConnected() {
    if(!this.isInitialized) return false
    return true
  }

  initialize() {
    this.app = initializeApp(this.options)
    this.db = getFirestore(this.app)
    this.isInitialized = true
  }

  getDB() {
    if(!this.isInitialized) {
      this.initialize()
    }
    if(!this.db) {
      throw new Error('Initialization failed')
    }

    return this.db
  }
}