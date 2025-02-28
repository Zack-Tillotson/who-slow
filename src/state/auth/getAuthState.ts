import { headers } from "next/headers"
import firebase from "../firebase"

const getAuthState = async () => {
  const headerList = await headers()
  const idToken = headerList.get('Authorization')?.split('Bearer ')[1] || ''
  const auth = firebase(idToken).getAuth()
  await auth.authStateReady()

  return auth
}

export default getAuthState