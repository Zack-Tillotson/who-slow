import { Metadata } from "next";
import { Games } from "@/views/games";
import getAuthState from "@/state/getAuthState";
import { AuthCTA } from "@/views/AuthCTA";
import { library } from "@/state/remote";
import { Game } from "@/state/types";

export const metadata: Metadata = {
  title: "Games | Who Slow ",
}

export default async function GamePage() {

  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }

  let games: Game[] = []
  try {
    games = await library().getGames()
  } catch(e) {
    console.log('DB Error', e)
  }
      
  return (
    <Games games={games} />
  )
}
