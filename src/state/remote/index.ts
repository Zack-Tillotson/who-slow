import {libraryFactory} from './library'
import { FirebaseConnection } from "./firebase";

// TODO .env
const firebaseConfig = {
  apiKey: "AIzaSyDODUUW_jJGZ4nKyiv4Iv_cOYiJ3espoYA",
  authDomain: "who-slow.firebaseapp.com",
  projectId: "who-slow",
  storageBucket: "who-slow.firebasestorage.app",
  messagingSenderId: "547271614568",
  appId: "1:547271614568:web:e1cf8a3224a23ff2c49bdd",
  measurementId: "G-TN5MJ4F097"
}

const firebase = new FirebaseConnection(firebaseConfig)

export const library = libraryFactory(firebase)