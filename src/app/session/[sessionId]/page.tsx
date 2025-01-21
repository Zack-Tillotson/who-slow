import { Metadata } from "next";

import getAuthState from "@/state/getAuthState"
import { library } from "@/state/remote"
import { AuthCTA } from "@/views/AuthCTA"
import { Session } from "@/views/sessions"

type PageProps = {
  params: Promise<{
    sessionId: string,
  }>,
}

export const metadata: Metadata = {
  title: "Setup session | Who Slow ",
}

export default async function SessionPage(props: PageProps) {
  const params = await props.params;

  const {
    sessionId
  } = params;

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
