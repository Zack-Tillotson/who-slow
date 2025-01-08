import { Metadata } from "next";
import getAuthState from "@/state/getAuthState";
import { AuthCTA } from "@/views/AuthCTA";
import { Profile } from "@/views/profile";

export const metadata: Metadata = {
  title: "Profile | Who Slow ",
}

export default async function PlayerPage() {

  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }
    
  return (
    <Profile auth={auth} />
  )
}
