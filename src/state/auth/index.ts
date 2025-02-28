import { signInAnonymously } from "firebase/auth";

import firebase from '../firebase'

const getAuthUser = async () => {
  const auth = firebase().getAuth()
  await auth.authStateReady()
  
  return auth.currentUser
}
const isAuthenticated = async () => {
  const currentUser = await getAuthUser()
  
  return !!currentUser
}

const loginAnonymous = async () => {
  const auth = firebase().getAuth()
  return signInAnonymously(auth)
}

const library = {
  isAuthenticated,
  getAuthUser,
  loginAnonymous,
}

export default library