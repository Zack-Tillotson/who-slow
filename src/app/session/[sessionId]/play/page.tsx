import getAuthState from "@/state/getAuthState";
import { library } from "@/state/remote";
import { SessionPlay } from "@/views/sessions"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session | Who Slow ",
}

type PageProps = {
  params: {
    sessionId: string,
  },
}

export default async function SessionPage({params: {sessionId}}: PageProps) {
  await getAuthState()

  const {game, players} = await library().getFilledSession(sessionId)

  return (
    <SessionPlay
      sessionId={sessionId}
      game={game}
      players={players}
    />
  )
}
