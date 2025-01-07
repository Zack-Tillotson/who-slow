import getAuthState from "@/state/getAuthState";
import { library } from "@/state/remote";
import { SessionForm } from "@/views/sessions"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit session | Who Slow ",
}

type PageProps = {
  params: {
    sessionId: string,
  },
}

export default async function SessionPage({params: {sessionId}}: PageProps) {
  const auth = await getAuthState()

  const session = await library().getSession(sessionId)
  const games = await library().getGames()
  const campaigns = await library().getCampaigns()
  const players = await library().getPlayers()

  return (
    <SessionForm
      session={session}
      games={games}
      campaigns={campaigns}
      players={players}
    />
  )
}
