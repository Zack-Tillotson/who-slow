import getAuthState from "@/state/getAuthState";
import { library } from "@/state/remote";
import { SessionPlay } from "@/views/sessions"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session | Who Slow ",
}

type PageProps = {
  params: Promise<{
    sessionId: string,
  }>,
}

export default async function SessionPage(props: PageProps) {
  const params = await props.params;

  const {
    sessionId
  } = params;

  await getAuthState()

  const session = await library().getSession(sessionId)
  const game = await library().getGame(session.game)
  const players = await library().getSessionPlayers(session)

  return (
    <SessionPlay
      sessionId={sessionId}
      game={game}
      players={players}
    />
  )
}
