import { Metadata } from "next";
import { Players } from "@/views/players";
import getAuthState from "@/state/getAuthState";
import { AuthCTA } from "@/views/AuthCTA";
import { library } from "@/state/remote";
import { Player } from "@/state/types";

export const metadata: Metadata = {
  title: "Players | Who Slow ",
}

export default async function PlayerPage() {

  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }

  let players: Player[] = []
  try {
    players = await library().getPlayers()
  } catch(e) {
    console.log('DB Error', e)
  }
      
  return (
    <Players players={players} />
  )
}
