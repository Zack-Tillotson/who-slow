import { Metadata } from "next";

import getAuthState from "@/state/getAuthState"
import { library } from "@/state/remote"
import { AuthCTA } from "@/views/AuthCTA"
import { Session } from "@/views/sessions"

type PageProps = {
  params: {
    sessionId: string,
  },
}

export const metadata: Metadata = {
  title: "Setup session | Who Slow ",
}

export default async function SessionPage({params: {sessionId}}: PageProps) {
  const auth = await getAuthState()
  if(!auth.currentUser) {
    return <AuthCTA />
  }

  const {session, game, players} = await library().getFilledSession(sessionId)

  return (
    <Session
      sessionId={sessionId}
      session={session}
      game={game}
      players={players}
    />
  )
}
