import getAuthState from "@/state/getAuthState";
import { library } from "@/state/remote";
import { SessionForm } from "@/views/sessions"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New session | Who Slow ",
}
export default async function SessionPage() {
  const auth = await getAuthState()

  const games = await library().getGames()
  const campaigns = await library().getCampaigns()
  const players = await library().getPlayers()
  return (
    <SessionForm
      games={games}
      campaigns={campaigns}
      players={players}
    />
  )
}
