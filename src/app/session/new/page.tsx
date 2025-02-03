import { buildViewData } from "@/state/buildViewData";
import { SessionForm } from "@/views/sessions"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New session | Who Slow ",
}
export default async function SessionPage() {
  
  const {interstitial, data: {games, campaigns, players}} = await buildViewData({
    games: null,
    campaigns: null,
    players: null,
  })

  if(interstitial) { // Error, loading, etc
    return interstitial 
  }

  return (
    <SessionForm
      games={games}
      campaigns={campaigns}
      players={players}
    />
  )
}
