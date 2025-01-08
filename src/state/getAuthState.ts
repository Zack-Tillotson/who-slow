import { headers } from "next/headers"
import firebase from "./firebase"

export default async () => {
  const headerList = headers()
  const idToken = headerList.get('Authorization')?.split('Bearer ')[1]

  const auth = firebase(idToken).getAuth()
  await auth.authStateReady()

  console.log('INFO', 'getAuthState', 'idToken?', !!idToken, 'await authStateReady().currentUser?', !!auth.currentUser)

  return auth
}